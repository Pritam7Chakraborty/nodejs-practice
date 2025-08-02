const http = require('http');
const { report } = require('process');
const testingSyntax = require ('./syntax.js');
//const calculateArea = require ('./practicSet.js');

const requestHandler = require('./user.js');

/* const server = http.createServer((req,res)=>
  {
  console.log(req.url, req.method);
  testingSyntax();
  }); */

const server = http.createServer(requestHandler);
const PORT = 3001;
server.listen(PORT,()=>{
  console.log(`Server running on address http://localhost:${PORT}`);
  
});