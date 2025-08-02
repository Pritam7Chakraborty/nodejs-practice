const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("1st middleware", req.url, req.method);
  next();
});

app.use((req, res, next) => {
  console.log("2nd middleware", req.url, req.method);
  next();
});

// app.use((req,res,next)=>{
//   console.log("3rd middleware",req.url,req.method);
//   res.send("<h1>Returns a respond</h1>");
//   next();
// });

app.get("/", (req, res, next) => {
  console.log("4th middleware", req.url, req.method);
  res.send(
    `<h1>Go to contact page</h1>
    <br>
    <a href='contact-us'>Contact page</a>`
  );
  next();
});

app.get("/contact-us", (req, res, next) => {
  console.log("Handling contact-us for GET", req.url, req.method);
  res.send(`
    <h1>Give your details here</h1>
    <form method="POST" action="/contact-us">
      <input type="text" placeholder="Enter your name" name="Name: "/>
      <input type="email" placeholder="Enter your email" name="Email: "/>
      <br>
      <input type="submit"/>
    </form>
    <a href='/'>home page</a>`);
    next();
});

app.post("/contact-us", (req, res, next) => {
  console.log("Handling contact-us for POST", req.url, req.method);
  res.send(`
    <h1>We will contact you shortly my guy</h1>
    `);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server running on address http://localhost:${PORT}`);
});
