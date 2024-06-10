const dayjs = require("dayjs");
const axios = require("axios");

console.log(process.env.MONO_API_URL)

const monoClient = axios.create({
        baseURL: process.env.MONO_API_URL,
        headers: {["X-Token"]: process.env.MONO_API_KEY}
    }
);

class MonoService {
    static clientInfoFetchedAt = dayjs().subtract(1, 'minute');
    static lastFetchedClientInfo = {};

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
}

module.exports = MonoService;