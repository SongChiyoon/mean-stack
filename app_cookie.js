var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser());
app.listen(3003, function(){
	console.log('3003 port!!');
});
app.get('/count',function(req, res){
	if(req.cookies.count){
		var count = parseInt(req.cookies.count);
	}
	else{
		var count = 0;
	}
	count = count +1;
	res.cookie('count', count);
	res.send('count : '+ count);
});