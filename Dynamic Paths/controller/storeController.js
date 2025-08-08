const Home = require("../Models/home");

exports.getHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes)=>
  res.render('store/home-list',
    {
     registeredHomes: registeredHomes,
     pageTitle: 'Homes List',
     currentPage : 'home'
    })
  );
};

exports.getIndex = (req, res, next) => {
  Home.fetchAll((registeredHomes)=>
  res.render('store/index',
    {
     registeredHomes: registeredHomes,
     pageTitle: 'airbnb Home',
     currentPage : 'index'
    })
  );
};

exports.getBoookings = (req, res, next) => {
  res.render('store/bookings',
    {
     pageTitle: 'My Bookings',
     currentPage : 'bookings '
    })
};

exports.getFavouriteList = (req, res, next) =>  {
  Home.fetchAll((registeredHomes)=>
  res.render('store/favourite-list',
    {
     registeredHomes: registeredHomes,
     pageTitle: 'My favourites',
     currentPage : 'favourites'
    })
  );
};
  
