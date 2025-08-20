const Home = require("../Models/home");
const fs = require("fs");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing: false,
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found for editing.");
      return res.redirect("/host/host-home-list");
    }

    console.log(homeId, editing, home);
    res.render("host/edit-home", {
      home: home,
      pageTitle: "Edit your Home",
      currentPage: "host-homes",
      editing: editing,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating } = req.body;
  console.log(houseName, price, location, rating);
  console.log(req.file);

  if (!req.files || !req.files.photo) {
    return res.status(422).send("No image provided");
  }

  const photo = req.files.photo[0].path;
  const rules = req.files.rules ? req.files.rules[0].path : null;

  const cleanedPrice = price.replace(/[^\d.]/g, ""); // Convert the cleaned string to a number
  const convertedPrice = parseFloat(cleanedPrice); 
  const home = new Home({
    houseName,
    price: convertedPrice, // Use the cleaned and converted price
    location,
    rating,
    photo,
    rules
  });

  home
    .save()
    .then(() => {
      console.log("Home Saved successfully");
      res.redirect("/host/host-home-list");
    })
    .catch((err) => {
      console.log("Error saving home: ", err); 
      res.redirect("/host/add-home");
    });
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, photo } = req.body;
  Home.findById(id)
    .then((home) => {
      home.houseName = houseName; 
      const cleanedPrice = price.replace(/[^\d.]/g, "");
      home.price = parseFloat(cleanedPrice); 
      home.location = location;
      home.rating = rating;

      if (req.files && req.files.photo) {
        fs.unlink(home.photo, (err) => {
          console.log("Error while deleting file ", err);
        });
        home.photo = req.files.photo[0].path;
      }

      home
        .save()
        .then((result) => {
          console.log("Home updated ", result);
        })
        .catch((error) => {
          console.log("Error while updating home", error);
        });
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log("Error while finding home for update", error);
    });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Came to delete ", homeId);
  Home.findByIdAndDelete(homeId)
    .then(() => {
      console.log("Delete successful");
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log("Error while deleting ", error);
      res.redirect("/host/host-home-list");
    });
};
