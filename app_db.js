var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
app.use(bodyParser.urlencoded({ extended: true })); 
app.locals.pretty = true;  //code를 pretty하게 만들어줌
app.set('views', './views_orientdb');

var OrientDB = require('orientjs');
var server = OrientDB({
   host:     'localhost',
   port:     2424,
   username: 'root',
   password: '123222',   //  유출될 수 있음으로 설정 파일을 통해서 password등을 관리해라
});
var db = server.use('o2');

app.set('view engine', 'jade');  //express에게 나는 jade 를 쓸것이라고 알려줌
app.get("/topic/add", function(req, res){
	var sql = 'SELECT FROM topic'
	db.query(sql).then(function(topics){
		res.render('add', {topics:topics});
	});
});
app.post('/topic/add', function(req, res){
	var title = req.body.title;  //저장한 파일의 이름
	var description = req.body.description; //파이 내용
	console.log(description);
	var author = req.body.author;	
	var sql = 'INSERT INTO topic (title, description, author) VALUES(:title,:description,:author)';
	db.query(sql, {params:{
		title:title,
		description:description,
		author:author
	}}).then(function(results){
		console.log(results)
		console.log(results[0])

		res.redirect('/topic/'+encodeURIComponent(results[0]['@rid']));
	});
	
});
app.get("/topic/:id/edit", function(req, res){
	
	var sql = 'SELECT FROM topic'
	var id = req.params.id;

	db.query(sql).then(function(topics){
		var sql = 'SELECT FROM topic WHERE @rid=:rid';
			db.query(sql, {params:{rid:id}}).then(function(topic){
				res.render('edit', {topics : topics, topic:topic[0]});
			});
	});
});
app.post("/topic/:id/edit", function(req, res){
	console.log('post edit');
	var sql = 'UPDATE topic SET title=:t, description=:d, author=:a WHERE @rid=:rid'
	var id = req.params.id;
	var title = req.body.title;
	var description = req.body.description;
	var author = req.body.title;

	db.query(sql, {
		params:{
			t:title,
			d:description,
			a:author,
			rid:id

	}}).then(function(topics){
		res.redirect('/topic/'+encodeURIComponent(id));
	});
});
app.get("/topic/:id/delete", function(req, res){

	console.log('delete');
	var sql = 'DELETE FROM topic WHERE @rid=:rid'
	var id = req.params.id;
	db.query(sql, {
		params:{
			rid:id
	}}).then(function(topics){
		res.redirect('/topic');
	});
});
app.get(['/topic', '/topic/:id'], function(req, res){
	console.log("get topic");
	var sql = 'SELECT FROM topic'
	db.query(sql).then(function(topics){
		var id = req.params.id;
		if(id){
			var sql = 'SELECT FROM topic WHERE @rid=:rid';
			db.query(sql, {params:{rid:id}}).then(function(topic){
				res.render('new', {topics : topics, topic:topic[0]});
			});
		}
		else{
			res.render('new', {topics : topics});
		}
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

