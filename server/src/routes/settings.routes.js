const {Router} = require('express');
const SettingsService = require("../services/SettingsService");
const express = require("express");

const settingsRouter = Router();

settingsRouter.get("", async (req, res) => {
    const settingsService = new SettingsService();
    const data = await settingsService.get();
    res.send(data);
});

settingsRouter.get("/:key", async (req, res) => {
    const {key} = req.params;
    const settingsService = new SettingsService();
    const data = await settingsService.getOne(key);
    res.send(data);
});

settingsRouter.post("", express.json(), async (req, res) => {
    const updatedSetting = req.body;
    const settingsService = new SettingsService();
    const data = await settingsService.setOne(updatedSetting);
    res.send(data);
});

module.exports = settingsRouter;