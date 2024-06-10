const express = require('express')
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const MongoService = require("./services/MonoService");

const PORT = process.env.PORT || 8091;

app.use(async (req, res, next) => {
   try {
      await next();
   } catch (e) {
      res.status(500).send(e.message);
   }
})

app.get("/api/client-info", async (req, res) => {
   const mongoService = new MongoService();
   const data = await mongoService.getClientInfo();
   res.send(data);
});

app.listen(PORT, () => {
   console.log(`App listening on port ${PORT}`)
})