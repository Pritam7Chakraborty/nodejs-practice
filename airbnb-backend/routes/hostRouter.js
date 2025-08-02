const express = require("express");
const path= require('path');
const hostRouter = express.Router();
const rootDir = require("../utils/pathUtil");


hostRouter.get("/host/add-home", (req, res, next) => {
  res.sendFile(path.join(rootDir,'views','addHome.html'));
});

hostRouter.post("/host/add-home", (req, res, next) => {
  console.log(req.body);
  const houseName = req.body.houseName;
  res.sendFile(path.join(rootDir,'views','homeAdded.html'));
});

module.exports = hostRouter;
