const express = require("express");
const storeRouter = express.Router();
const homescontroller = require("../controller/storeController");


storeRouter.get("/",homescontroller.getIndex);
storeRouter.get("/homes", homescontroller.getHomes);
storeRouter.get("/bookings", homescontroller.getBoookings);
storeRouter.get("/favourites", homescontroller.getFavouriteList);

module.exports = storeRouter;
