var express = require('express');
var session = require('express-session');
var app = express();
app.set('trust proxy', 1) // trust first proxy

app.listen(3003, function(){
	console.log("port 3003 connect!");
});
app.use(session({
  secret: '12414asfas1234124',   //session id를 숨겨줌
  resave: false,  
  saveUninitialized: true
}));

app.get('/count', function(req, res){
	if(req.session.count){
		req.session.count++;
		
	}else{
		req.session.count = 1;
	}
	res.send("count :"+req.session.count);
});
app.get('/tmp', function(req, res){
	res.send('resut : '+req.session.count);
});