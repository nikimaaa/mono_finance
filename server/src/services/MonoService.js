const dayjs = require("dayjs");
const axios = require("axios");
const mccData = require("../constants/mcc-data.json");
const mccGroups = require("../constants/mcc-groups.json");

const monoClient = axios.create({
        baseURL: process.env.MONO_API_URL,
        headers: {["X-Token"]: process.env.MONO_API_KEY}
    }
);

class MonoService {
    static clientInfoFetchedAt = dayjs().subtract(1, 'minute');
    static lastFetchedClientInfo = {};

    static transactionsInfoFetchedAt = dayjs().subtract(1, 'minute');
    static lastFetchedTransactions = {};

    async getClientInfo() {
        //You can fetch client info only once per minute
        if(dayjs().diff(MonoService.clientInfoFetchedAt, "minute") < 1){
            return MonoService.lastFetchedClientInfo;
        }

        const response = await monoClient.get("/personal/client-info");
        MonoService.clientInfoFetchedAt = dayjs();
        MonoService.lastFetchedClientInfo = response.data;
        return response.data;
    }

    calculateAnalytic(transactions) {
        const now = dayjs().date();
        const year = dayjs().year();
        const month = dayjs().month();

        let aggregation = {};

        const groups = Array.from(new Set(transactions.map((transaction) => transaction.mccInfo.group.type)));

        for(let group of groups){
            aggregation[group] = {};
            for(let i = 1; i <= now; i++) {
                aggregation[group][dayjs().date(i).format("DD.MM.YYYY")] = 0;
            }
        }

        for(let transaction of transactions) {
            const {time, mccInfo, amount: minusAmount} = transaction;

            if(minusAmount > 0) {
                continue;
            }

            const amount = -minusAmount;

            const day = dayjs(time * 1000).format("DD.MM.YYYY");
            const group = mccInfo.group.type;

            aggregation[group][day] = aggregation[group][day] + (amount / 100);
        }

        let analytic = [];

        for(let group in aggregation) {
            analytic.push({id: mccGroups[group], data: Object.entries(aggregation[group]).map(entry => ({x: entry[0], y: entry[1]}))});
        }

        return analytic;
    }

    async getClientTransactions() {
        const now = dayjs().unix();
        const startOfMonth = dayjs().startOf("month").unix();

        if(dayjs().diff(MonoService.transactionsInfoFetchedAt, "minute") < 1){
            const analytic = this.calculateAnalytic(MonoService.lastFetchedTransactions);
            return {transactions: MonoService.lastFetchedTransactions, analytic};
        }

        const response = await monoClient.get(`/personal/statement/0/${startOfMonth}/${now}`);
        const data = response.data;
        const dataWithMccInfo = data.map((item) => ({...item, mccInfo: mccData[item.mcc]}))
        const analytic = this.calculateAnalytic(dataWithMccInfo);

        MonoService.transactionsInfoFetchedAt = dayjs();
        MonoService.lastFetchedTransactions = dataWithMccInfo;

        return {transactions: dataWithMccInfo, analytic};
    }
}

module.exports = MonoService;