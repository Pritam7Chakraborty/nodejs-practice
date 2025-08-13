const Favourite = require("../Models/favourite");
const Home = require("../Models/home");

exports.getHomes = (req, res, next) => {
  Home.fetchAll().then(registeredHomes =>
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "home",
    })
  );
};

exports.getIndex = (req, res, next) => {
  Home.fetchAll().then(registeredHomes =>
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    })
  );
};

exports.getBoookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings ",
  });
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourites().then(favourites => {
    favourites = favourites.map(fav => fav.houseId);
    Home.fetchAll().then(registeredHomes => {
      console.log(favourites);
      const favouriteHomes = registeredHomes.filter((home) =>
        favourites.includes(home._id.toString())
      );
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My favourites",
        currentPage: "favourites",
      });
    });
  });
};

exports.postAddToFavourites = (req, res, next) => {
  const homeId = req.body.homeId;
  const fav = new Favourite(homeId);
  fav.save().then(result => {
    console.log("Home added to favourites: "),result;
  }).catch(error => {
    console.log("Error while adding to favourites", error);
  }).finally(() => {
    res.redirect("/favourites");
  })
};

exports.postRemoveFromFavourites = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId).then(result => {
    console.log("Home removed from favourites: "),result;
  }).catch(error => {
    console.log("Error while removing from favourites", error);
  }).finally(() => {
    res.redirect("/favourites");
  })
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then(home => {
    if (!home) {
      console.log("Home not found");
      res.redirect("/homes");
    } else {
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Details",
        currentPage: "Home",
      });
    }
  });
};
