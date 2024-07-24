const {Router} = require('express');
const ReserveService = require("../services/ReserveService");
const express = require("express");
const validate = require("../helpers/validate");

const reservesRouter = Router();

reservesRouter.get("", async (req, res) => {
    const query = req.query;

    const errors = await validate(query, {
        sortBy: "in:createdAt,name",
        sortOrder: "in:asc,desc",
        query: "string"
    });

    if(errors) {
        return res.status(422).send(errors);
    }

    const reserveService = new ReserveService();
    const data = await reserveService.findAll(query);
    res.send(data);
});

reservesRouter.get("/total", async (req, res) => {
    const reserveService = new ReserveService();
    const data = await reserveService.total();
    res.send(data);
});

reservesRouter.post("", express.json(), async (req, res) => {
    const newReserve = req.body;
    const reserveService = new ReserveService();
    const data = await reserveService.create(newReserve);
    res.send(data);
});

reservesRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const reserveService = new ReserveService();
    const data = await reserveService.deleteOne(+id);
    res.send(data);
});

module.exports = reservesRouter;