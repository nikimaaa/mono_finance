const express = require('express')
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const reservesRouter = require('./routes/reserves.router');
const settingsRouter = require("./routes/settings.routes");

const MongoService = require("./services/MonoService");
const path = require("path");

const PORT = process.env.PORT || 8091;

app.use(async (req, res, next) => {
   try {
      await next();
   } catch (e) {
      res.status(500).send(e.message);
   }
});

app.use('/api/reserves', reservesRouter);
app.use('/api/settings', settingsRouter);

app.get("/api/client-info", async (req, res) => {
   const mongoService = new MongoService();
   const data = await mongoService.getClientInfo();
   res.send(data);
});

app.get("/api/client-transactions", async (req, res) => {
   const mongoService = new MongoService();
   const data = await mongoService.getClientTransactions();
   res.send(data);
})

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
   console.log(`App listening on port ${PORT}`)
})