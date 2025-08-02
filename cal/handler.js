const{sumRequestHandler}= require('./sum');

const requestHandler = (req, res) => {
  console.log(req.url, req.method);

  if (req.url === "/") {
    res.setHeader("content-Type", "text/html");
    res.write(`
      <html>
    <head>
      <title> Calculator App
        </title> 
    </head>
    <body>
      <h1>Welcome to Calculator</h1>
      <a href = "/calculator">Go to Calculator</a>

    </body>
    </html>
    `);
    return res.end();
  } else if (req.url === "/calculator") {
    res.setHeader("content-Type", "text/html");
    res.write(`
      <html>
    <head>
      <title> Calculator App
        </title> 
    </head>
    <body>
      <h1>Welcome to Calculator</h1>
      <form action="/calculate-result" method="POST">
      <input type="text" placeholder="First number" name="first"> </input>
      <input type="text" placeholder="Second number" name="second"> </input>
      <input type="submit" value="sum"> </input>
      </form>
    </body>
    </html>
    `);
    return res.end();
  }
  else if(req.url === "/calculate-result" && req.method === 'POST') {

    sumRequestHandler(req,res);
    return ;
  }

  res.setHeader("content-Type", "text/html");
  res.write(`
      <html>
    <head>
      <title> Calculator App
        </title> 
    </head>
    <body>
      <h1>404 yeh kya ho gya</h1>
      <a href = "/">Go to Home</a>

    </body>
    </html>
    `);
  return res.end();
};

exports.requestHandler = requestHandler;
