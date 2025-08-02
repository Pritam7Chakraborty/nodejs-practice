const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  if(req.url==="/home"){
    res.write('<h1>Welcome to Home</h1>');
    return res.end();
  }
  else if(req.url==="/men"){
    res.write('<h1>Welcome to Men</h1>');
    return res.end();
  }

  else if(req.url==="/women"){
    res.write('<h1>Welcome to Women</h1>');
    return res.end();
  }

  else if(req.url==="/kids"){
    res.write('<h1>Welcome to Kids</h1>');
    return res.end();
  }

  else if(req.url==="/cart"){
    res.write('<h1>Welcome to Cart</h1>');
    return res.end();
  }



  res.write(`
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Node practice</title>
  </head>
  <body style="background-color: black">
    <div>
      <nav
        style="
          color: white;
          background-color: slategray;
          margin: 10px;
          padding: 10px;
          justify-content: space-between;
        "
      >
        <center>
         
          <a href="/home" style="color: white; padding: 14px 16px">Home</a>

          <a href="/men" style="color: white; padding: 14px 16px">Men</a>

          <a href="/women" style="color: white; padding: 14px 16px">Women</a>

          <a href="/kids" style="color: white; padding: 14px 16px">Kids</a>

          <a href="/cart" style="color: white; padding: 14px 16px">cart</a>
          
         
        </center>
      </nav>
    </div>
  </body>
</html>

    
    `);
  res.end();
});

server.listen(3001, () => {
  console.log("server running on address http://localhost:3001");
});
