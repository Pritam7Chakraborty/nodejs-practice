const { getDb } = require("../utils/databaseUtil");

module.exports = class Home {
  constructor(houseName, price, location, rating, photo) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photo = photo;
  }

  save() {
    const db = getDb();
    return db.collection("homes").insertOne(this);
  }

  static fetchAll() {
  }

  static findById(homeId ) {
  }

  static deleteById(homeId) {}
};
