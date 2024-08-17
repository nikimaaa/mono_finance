const {Router} = require('express');
const NationalBankService = require("../services/NationalBankService");

const currencyRouter = Router();

currencyRouter.get("/history", async (req, res) => {
    const nationalBankService = new NationalBankService();
    const data = await nationalBankService.history();
    res.send(data);
});

module.exports = currencyRouter;