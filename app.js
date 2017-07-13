//entry application
//routing


var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true })); 
// body-parser module 붙임. 이 middleware 를 post로 들어오는 data를 통과 후 붙는다
app.set('view engine','jade');
app.set('views','./views');  //templete 파일 디렉토리 지정
app.use(express.static('public'));
app.locals.pretty = true;  //code를 pretty하게 만들어줌
app.get('/form', function(req, res){
	res.render('form');
});
app.get('/form_receiver', function(req, res){  //form_receiver 의 방식이 get이다 -> post 로 바꿔주면 post 받을수 있다
	var title = req.query.title;
	var description = req.query.description;
	res.send(title+','+description);
});
app.post('/form_receiver', function(req, res){  //post로 받은 data를 어떻게 나타낼 수 있는가? http://expressjs.com/en/4x/api.html#req.body
	//body-parser 를 통해 들어오는 data를 읽자
	var title = req.body.title;  //body-parser추가로 이 객체가 생성됨
	var description = req.body.description;
	res.send(title+','+description);
});
app.get('/topic/:id', function(req, res){  //api reference 에서 express 명령어 사전 확인해라 
	var topics = [
		'Javascript is ...',
		'Node is ...',
		'Express is ...'
	]
	var output = `
		<a href="/topic?id=0">Javascript</a><br>
		<a href="/topic?id=1">Node</a><br>
		<a href="/topic?id=2">Express is</a><br>
		${topics[req.params.id]}
	`

	res.send(output);  //request에 따라 알맞는 res를 전달해준다.
});
app.get('/topic/:id', function(req, res){  //api reference 에서 express 명령어 사전 확인해라 
	var topics = [
		'Javascript is ...',
		'Node is ...',
		'Express is ...'
	]
	var output = `
		<a href="/topic?id=0">Javascript</a><br>
		<a href="/topic?id=1">Node</a><br>
		<a href="/topic?id=2">Express is</a><br>
		${topics[req.params.id]}
	`

	res.send(output);  //request에 따라 알맞는 res를 전달해준다.
});
app.get('/topic/:id/:mode', function(req, res){
	res.send(req.params.id+","+req.params.mode);
});
app.get('/template', function(req, res){
	res.render('temp', {time:Date(), _title:'Jade'});  //template경로를 통해 들어온 사용자에게 'temp' 파일을 웹페이지로 렌더링해서 전송한다.
	//{} : jade 에서 표현하고싶은 변수입력
});

app.get('/', function(req, res){
	res.send('hello homepage');   //call back
});
app.get('/hello', function(req,res){
	res.send('Hello Router, <img src = "/me.jpeg">');
})
app.get('/dynamic', function(req, res){ //동적인 파일 서비스  서버를 끈후 다시 시작해야한다
	var lis ='';
	for(var i=0;i<5;i++){
		lis = lis + '<li>coding</li>'
	}
	var time = Date();
	var output = `<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
	<h1>Hello HTML!</h1>
	${lis} 
	${time} 
</body>
</html>`; //GRAVE ACCENT
 //변수는 ${} 로 표현한다

	res.send(output);
});
app.get('/login', function(req, res){
	res.send('<h1>login please</h1>');
});
app.listen(3000, function(){ // port번호 지정
	console.log('conneted 3000 port!');
});

