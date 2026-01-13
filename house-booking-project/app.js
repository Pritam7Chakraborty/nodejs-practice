const express = require("express");
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");
const rootDir = require("./utils/pathUtil");
const path = require("path");
const errorsController = require("./controller/errors");
const { default: mongoose } = require("mongoose");
const session = require("express-session");
const mongoDBstore = require("connect-mongodb-session")(session);
const multer = require("multer");
const DB_PATH =
  "mongodb+srv://root:root@cluster0.qcw2wf8.mongodb.net/airbnb?retryWrites=true&w=majority&appName=Cluster0";

const app = express();

app.set("views", path.join(rootDir, "views"));
app.set("view engine", "ejs");

const store = new mongoDBstore({
  uri: DB_PATH,
  collection: "sessions",
});

const randomString = (length) => {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, randomString(10) + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true); // Accept the file
  } else {
    cb(null, false); // Reject the file
  }
};

//BODY PERSER
app.use(express.urlencoded({ extended: true }));
app.use(
  multer({ storage, fileFilter }).fields([
    { name: "photo", maxCount: 1 },
    { name: "rules", maxCount: 1 },
  ])
);
app.use(express.static(path.join(rootDir, "public")));
app.use("/uploads", express.static(path.join(rootDir, "uploads")));
app.use("/host/uploads", express.static(path.join(rootDir, "uploads")));
app.use("/homes/uploads", express.static(path.join(rootDir, "uploads")));

app.use(
  session({
    secret: "pritamChakraborty",
    resave: false,
    saveUninitialized: true,
    store,
  })
);

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});

app.use(authRouter);
app.use(storeRouter);
app.use("/host", (req, res, next) => {
  if (!req.isLoggedIn) {
    return res.redirect("/login");
  } else {
    next();
  }
});
app.use("/host", hostRouter);

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
