const express = require("express");
const path= require('path');
const contactRouter = express.Router();
const rootDir = require("../utils/pathUtil");

contactRouter.get("/contact-us", (req, res, next) => {
  console.log("Handling contact-us for GET", req.url, req.method);
  res.sendFile(path.join(rootDir,"views","contact-us.html"));
});

contactRouter.post("/contact-us", (req, res, next) => {
  console.log("Handling contact-us for POST", req.url, req.method);
  console.log(req.body);
  res.sendFile(path.join(rootDir,"views","contact-success.html"));
});

module.exports = contactRouter;
