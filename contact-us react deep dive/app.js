const express = require("express");
const rootDir = require('./utils/pathUtil');
const path = require('path');

const homeRouter = require("./routes/homeRouter");
const contactRouter = require("./routes/contactRouter");

const app = express();

app.use(express.urlencoded());

app.use(homeRouter);
app.use(contactRouter);

app.use((req,res,next)=>{
  res.sendFile(path.join(rootDir,"views","404.html"));
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server running on address http://localhost:${PORT}`);
});
