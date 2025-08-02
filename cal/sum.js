const sumRequestHandler = (req, res) => {
  console.log("In sum Request Handler", req.url);
  const body = [];
  req.on("data", (chunk) => body.push(chunk));
  req.on("end", () => {
    const bodyStr = Buffer.concat(body).toString();
    const params = new URLSearchParams(bodyStr);
    const bodyObj = Object.fromEntries(params);
    const result = Number(bodyObj.first) + Number(bodyObj.second);
    console.log(result);
    res.setHeader("content-Type", "text/html");
    res.write(`
      <html>
    <head>
      <title> Calculator App
        </title> 
    </head>
    <body>
      <h1>Your sum is ${result}</h1>
    </body>
    </html>
    `);
    return res.end();
  });
};

exports.sumRequestHandler = sumRequestHandler;
