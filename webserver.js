//get http module
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

//call create Server method from http

/*축약형
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});*/


var server = http.createServer(function(request, response){
	response.statusCode = 200;
  	response.setHeader('Content-Type', 'text/plain');
  	response.end('Hello World\n');
});
server.listen(port, hostname, function(){
	console.log(`Server running at http://${hostname}:${port}/`);
});

