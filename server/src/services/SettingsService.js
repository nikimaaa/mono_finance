const dbClient = require("../dbClient");

class SettingsService {
    getNormalizedValue(value, type) {
        if (type === "OBJECT") {
            return JSON.parse(value);
        }
        if (type === "NUMBER") {
            return +value;
        }
        return value;
    }

    async get() {
        const metaData = await dbClient.setting.findMany();
        return metaData.reduce((acc, current) => {
            const {value, key, type} = current;
            acc = {...acc, [key]: this.getNormalizedValue(value, type)};
            return acc;
        }, {});
    }

    async getOne(key) {
        const metaData = await dbClient.setting.findFirst({where: {key}});
        if (!metaData) {
            return null;
        }
        return this.getNormalizedValue(metaData.value, metaData.type);
    }

    async setOne(data) {
        const {value, type, key} = data;
        return dbClient.setting.update({
            where: {key}, data: {
                key,
                type,
                value: type === "OBJECT" ? JSON.stringify(value) : String(value)
            }
        });
    }
}

module.exports = SettingsService;