const axios = require("axios");

const monoClient = axios.create({
        baseURL: process.env.MONO_API_URL,
        headers: {["X-Token"]: process.env.MONO_API_KEY}
    }
);

class MonoService {
    async getClientInfo() {
        const response = await monoClient.get("/personal/client-info");
        return response.data;
    }

    async getClientTransactions(from, to) {
        const response = await monoClient.get(`/personal/statement/0/${from}/${to}`);
        return response.data;
    }
}

module.exports = MonoService;