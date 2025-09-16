var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!');
}).listen(8088);


function add(a,b){
  let a = a + 10;
  return a + b
}

hello = function(a,b){
  let a = a + 10;
  return a + b
}

hello = (a,b) => {
  let a = a + 10;
  return a + b
}

hello(12,80);
/*

const http = require('http');

const hostname = '127.0.0.1';
const port = 8088;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

*/