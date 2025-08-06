const express = require("express");
const userRouter = require("./routes/userRouter");
const { hostRouter } = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(rootDir, "public")));
//BODY PERSER
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);
app.use("/host", hostRouter);



app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
