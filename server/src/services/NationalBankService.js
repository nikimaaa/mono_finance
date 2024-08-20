const dayjs = require("dayjs");
const axios = require("axios");

class NationalBankService {
    async history() {
        const end = dayjs().format("YYYYMMDD");
        const start = dayjs().subtract(30, "days").format("YYYYMMDD");
        const valcode = "usd";

        const searchParams = new URLSearchParams({
            start,
            end,
            valcode,
            sort: "exchangedate",
            order: "asc"
        });

        const url = `https://bank.gov.ua/NBU_Exchange/exchange_site?${searchParams.toString()}&json`
        const response = await axios.get(url);

        return response.data;
    }
}

module.exports = NationalBankService;