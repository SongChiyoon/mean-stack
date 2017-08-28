var express = require('express');
var route = express.Router();  //router를 호출

route.get('/r1', function(req, res){
  res.send('Hello /p1/r1');
});
route.get('/r2', function(req, res){
  res.send('Hello /p1/r2');
});

module.exports = route;
