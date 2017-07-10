var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
app.use(bodyParser.urlencoded({ extended: true })); 
app.locals.pretty = true;  //code를 pretty하게 만들어줌
app.set('views', './views_file');
app.set('view engine', 'jade');  //express에게 나는 jade 를 쓸것이라고 알려줌
app.get("/topic/new", function(req, res){
	res.render('view')
});
app.get('/topic', function(req, res){
	fs.readdir('data/', function(err, data){
		if(err){
			console.log(err);  //error는 console로 찍어줘야 상세하게 찍힌다.
			res.status(500).send('Internal Server Error');
		}
		else{
			res.render('new', {topics:data}); //주입하고자 하는 데이터를 객체에 담아서 주입한다.
		}
	});
});
app.get('/topic/:id', function(req, res){
	var id = req.params.id;
	fs.readdir('data/', function(err, files){
		if(err){
			console.log(err);  //error는 console로 찍어줘야 상세하게 찍힌다.
			res.status(500).send('Internal Server Error');
		}
		//directory 목록들을 다 갖고온	
		//id 값을 통해 특정 파일의 데이터를 읽어온다,
		fs.readFile('data/'+id, 'utf8', function(err, data){
			if(err){
				console.log(err);  //error는 console로 찍어줘야 상세하게 찍힌다.
				res.status(500).send('Internal Server Error');
			}
			else{
				res.render('new',{topics:files, title:id, description:data});
			}
		});
	});
});
app.post('/topic', function(req, res){
	var title = req.body.title;  //저장한 파일의 이름
	var description = req.body.description; //파이 내용
	fs.writeFile('data/'+title, description, function(err){
		if(err){
			console.log(err);  //error는 console로 찍어줘야 상세하게 찍힌다.
			res.status(500).send('Internal Server Error');

		}
		else{
			res.send('Success');
		}
	});

});
app.listen(3000, function(){
	console.log("connect to 3000");
})

