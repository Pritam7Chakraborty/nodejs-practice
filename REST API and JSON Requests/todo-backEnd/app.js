const express = require("express");

const { default: mongoose } = require("mongoose");
const DB_PATH =
  "mongodb+srv://root:root@cluster0.qcw2wf8.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0";

const app = express();
const errorsController = require("./controller/errors");


//BODY PERSER
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, "public")));
app.use(errorsController.pageNotFound);

const PORT = 3001;

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
