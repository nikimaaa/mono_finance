const dayjs = require("dayjs");
const dbClient = require("../dbClient");
const MongoService = require("./MonoService");
const mccData = require("../constants/mcc-data.json");
const merge = require("lodash/merge");

class TransactionsService {
    async findAll(query) {
        const filters = merge({
            query: "",
            sortBy: "occurredAt",
            sortOrder: "desc",
            pageSize: 10,
            page: 10
        }, query);

        const [transactions, count] = await Promise.all(
            [
                dbClient.transaction.findMany({
                    where: {description: {contains: filters.query, mode: 'insensitive'}},
                    orderBy: {[filters.sortBy]: filters.sortOrder},
                    take: Number(filters.pageSize),
                    skip: (Number(filters.page) - 1) * Number(filters.pageSize)
                }),
                dbClient.transaction.count({
                    where: {description: {contains: filters.query, mode: 'insensitive'}}
                })
            ]
        );

        const pagesCount = Math.ceil(count / filters.pageSize);
        const normalizedTransactions = transactions.map(
            (transaction) => ({...transaction, mccInfo: mccData[transaction.mcc]})
        );

        return {pagesCount, transactions: normalizedTransactions}
    }

    async summary() {
        const response = await dbClient.$queryRaw`
            SELECT
            SUM(CASE WHEN amount >= 0 THEN amount ELSE 0 END) as incomes,
            SUM(CASE WHEN amount < 0 THEN amount ELSE 0 END) as expenses
            FROM "Transaction"
        `;

        const expenses = Number(response[0].expenses);
        const incomes = Number(response[0].incomes);

        return {expenses, incomes}
    }

    async sync() {
        let from = dayjs().startOf("month").unix();
        const to = dayjs().unix();

        const lastTransaction = await dbClient.transaction.findFirst({
            orderBy: {'occurredAt': 'desc'},
            select: {occurredAt: true}
        });

        if (lastTransaction) {
            from = dayjs(lastTransaction.occurredAt).unix() + 1;
        }

        const mongoService = new MongoService();
        const transactions = await mongoService.getClientTransactions(from, to);

        const normalizedData = transactions.map(({time, ...rest}) => {
            return {occurredAt: dayjs(time * 1000).toISOString(), ...rest}
        })

        await dbClient.transaction.createMany({
            data: normalizedData
        });
    }
}

module.exports = TransactionsService;