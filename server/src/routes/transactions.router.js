const {Router} = require('express');
const SettingsService = require("../services/SettingsService");
const TransactionsService = require("../services/TransactionsService");
const validate = require("../helpers/validate");

const transactionsRouter = Router();

transactionsRouter.get("/summary", async (req, res) => {
    const transactionsService = new TransactionsService();
    const data = await transactionsService.summary();

    res.send(data);
});

transactionsRouter.get("", async (req, res) => {
    const query = req.query;

    const errors = await validate(query, {
        sortBy: "in:occurredAt",
        sortOrder: "in:asc,desc",
        query: "string",
        page: "integer",
        pageSize: "integer"
    });

    if(errors) {
        return res.status(422).send(errors);
    }

    const transactionsService = new TransactionsService();
    const data = await transactionsService.findAll(query);
    res.send(data);
});

module.exports = transactionsRouter;