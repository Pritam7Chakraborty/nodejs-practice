const path = require("path");

const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const DB_PATH =
  "mongodb+srv://root:root@cluster0.qcw2wf8.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0";

const todoItemsRouter = require("./routes/todoItemsRouter");
const errorsController = require("./controller/errors");
const app = express();

//BODY PERSER
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());

app.use("/api/todo", todoItemsRouter);

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
