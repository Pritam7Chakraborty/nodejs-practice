const express = require("express");
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");
const path = require("path");
const errorsController = require("./controller/errors");
const { default: mongoose } = require("mongoose");

const app = express();

app.set("views", path.join(rootDir, "views"));
app.set("view engine", "ejs");

//BODY PERSER
app.use(express.urlencoded({ extended: true }));
app.use(storeRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, "public")));

app.use(errorsController.pageNotFound);

const PORT = 3001;
const DB_PATH =
  "mongodb+srv://root:root@cluster0.qcw2wf8.mongodb.net/airbnb?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("MongoDB connected successfully!");
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to MongoDB:", err);
  });
