const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

const MONGO_URL =
  "mongodb+srv://root:root@cluster0.qcw2wf8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
    .then((client) => {
      
      _db = client.db('airbnb'); // Store the database connection
      callback();
    })
    .catch((err) => {
      console.log("Error while connecting to MongoDB:", err);
    });
};

const getDb = () => {
  if (!_db) {
    throw new Error("No database found! Please connect first.");
  }
  return _db;
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;