//External modules
const express = require("express");
//Local modules
const requestHandler = require("./user.js");

const app = express();

app.use((req,res,next)=>{
  console.log("I came first",req.url,req.method);
  next();
});

app.use((req,res,next)=>{
  console.log("I came Second",req.url,req.method);
  res.send("<h1>Hello testing</h1>")
});

// const server = http.createServer(app);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
