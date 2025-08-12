const express = require("express");
const storeRouter = express.Router();
const storeController = require("../controller/storeController");


storeRouter.get("/",storeController.getIndex);
storeRouter.get("/homes", storeController.getHomes);
storeRouter.get("/bookings", storeController.getBoookings);
storeRouter.get("/favourites", storeController.getFavouriteList);
storeRouter.get("/homes/:homeId", storeController.getHomeDetails);
storeRouter.post("/favourites", storeController.postAddToFavourites);
storeRouter.post("/favourites/delete/:homeId", storeController.postRemoveFromFavourites);

module.exports = storeRouter;
