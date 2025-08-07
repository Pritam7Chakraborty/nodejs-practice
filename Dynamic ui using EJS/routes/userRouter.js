const express = require("express");
const path= require('path');
const userRouter = express.Router();
const {registeredHomes} = require("./hostRouter");

userRouter.get("/", (req, res, next) => {
  console.log(registeredHomes);
  
  res.render('home', {registeredHomes: registeredHomes, pageTitle: 'airbnb Home', currentPage : 'home'});
});

module.exports = userRouter;
