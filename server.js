/**
 * Created by songchiyun on 2017. 6. 11..
 */
const http = require('http');

const hostname = '127.0.0.1';
const port = 1337;


var proxy = http.createServer( (req, res) => {
        res.writeHead(200, {'Content-Type': 'text/plain'});
res.end('okay');
});