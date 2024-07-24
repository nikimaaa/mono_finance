const {Router} = require('express');
const DashboardService = require("../services/DashboardService");

const dashboardRouter = Router();

dashboardRouter.get("/balance", async (req, res) => {
    const dashboardService = new DashboardService();
    const data = await dashboardService.balance();
    res.send(data);
});

module.exports = dashboardRouter;