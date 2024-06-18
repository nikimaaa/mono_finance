const express = require('express')
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const MongoService = require("./services/MonoService");
const ReserveService = require("./services/ReserveService");
const SettingsService = require("./services/SettingsService");

const PORT = process.env.PORT || 8091;

app.use(async (req, res, next) => {
   try {
      await next();
   } catch (e) {
      res.status(500).send(e.message);
   }
});

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

app.get("/api/reserve", async (req, res) => {
   const reserveService = new ReserveService();
   const data = await reserveService.findAll();
   res.send(data);
});

app.post("/api/reserve", express.json(), async (req, res) => {
   const newReserve = req.body;
   const reserveService = new ReserveService();
   const data = await reserveService.create(newReserve);
   res.send(data);
});

app.delete("/api/reserve/:id", async (req, res) => {
   const id = req.params.id;
   const reserveService = new ReserveService();
   const data = await reserveService.deleteOne(+id);
   res.send(data);
});

app.get("/api/settings", async (req, res) => {
   const settingsService = new SettingsService();
   const data = await settingsService.get();
   res.send(data);
});

app.get("/api/settings/:key", async (req, res) => {
   const {key} = req.params;
   const settingsService = new SettingsService();
   const data = await settingsService.getOne(key);
   res.send(data);
});

app.post("/api/settings", express.json(), async (req, res) => {
   const updatedSetting = req.body;
   const settingsService = new SettingsService();
   const data = await settingsService.setOne(updatedSetting);
   res.send(data);
});


app.listen(PORT, () => {
   console.log(`App listening on port ${PORT}`)
})