const dbClient = require("../dbClient");

class ReserveService {
    async findAll() {
        return dbClient.reserve.findMany();
    }

    async deleteOne(id) {
        return dbClient.reserve.delete({where: {id}})
    }

    async create(data) {
        return dbClient.reserve.create({data})
    }
}

module.exports = ReserveService;