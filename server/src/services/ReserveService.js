const dbClient = require("../dbClient");

class ReserveService {
    async findAll(query) {
        return dbClient.reserve.findMany({
            where: {name: {contains: query.query || "", mode: 'insensitive'}},
            orderBy: {[query.orderBy || "createdAt"]: query.sortOrder || "desc"},
        });
    }

    async total() {
        const aggregation = await dbClient.reserve.aggregate({
            _sum: {
                price: true
            }
        });
        return aggregation._sum.price;
    }

    async deleteOne(id) {
        return dbClient.reserve.delete({where: {id}})
    }

    async create(data) {
        return dbClient.reserve.create({data})
    }

    async update(data) {
        return dbClient.reserve.update({where: {id: data.id}, data});
    }
}

module.exports = ReserveService;