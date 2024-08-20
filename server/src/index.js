const express = require('express')
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const MongoService = require("./services/MonoService");
const path = require("path");
const dbClient = require("./dbClient");
const dayjs = require("dayjs");
const {CronJob} = require("cron");
const TransactionsService = require("./services/TransactionsService");

const reservesRouter = require('./routes/reserves.router');
const settingsRouter = require("./routes/settings.routes");
const transactionsRouter = require("./routes/transactions.router");
const dashboardRouter = require("./routes/dashboard.router");
const currencyRouter = require("./routes/currency.router");

const PORT = process.env.APPLICATION_PORT || 8091;
const transactionsService = new TransactionsService();

const syncTransactionsJob = new CronJob(
    '0 0,10,20,30,40,50 * * * *',
    async () => {
        try {
            await transactionsService.sync();
            console.log("Successfully syncing transactions");
        } catch (e) {
            console.log("Failed to sync transactions")
        }
    },
    null,
    true
);

const syncAccountsJob = new CronJob(
    '0 5,15,25,35,45,51 * * * *',
    async () => {
        try {
            console.log(dayjs().format("YYYY-MM-DD HH:mm:ss"));
            const mongoService = new MongoService();
            const clientInfo = await mongoService.getClientInfo();
            await Promise.all(clientInfo.accounts.map((account) => dbClient.account.upsert({
                where: {id: account.id},
                update: account,
                create: account
            })));
            console.log("Successfully syncing accounts");
        } catch (e) {
            console.log("Failed to sync accounts")
        }
    },
    null,
    true
);

app.use(async (req, res, next) => {
   try {
      await next();
   } catch (e) {
      res.status(500).send(e.message);
   }
});

app.use('/api/reserves', reservesRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/currency', currencyRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
   console.log(`App listening on port ${PORT}`)
})