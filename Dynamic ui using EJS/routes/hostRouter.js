const express = require("express");
const path= require('path');
const hostRouter = express.Router();


hostRouter.get("/add-home", (req, res, next) => {
  res.render('addHome', {pageTitle: 'Add Home to airbnb'});
});

const registeredHomes = [];

hostRouter.post("/add-home", (req, res, next) => {
  console.log('Home registration successful for:', req.body);
  registeredHomes.push({houseName : req.body.houseName});
  res.render('homeAdded', {pageTitle: 'Home Added Successfully'});
});

exports.hostRouter = hostRouter;
exports.registeredHomes= registeredHomes;
