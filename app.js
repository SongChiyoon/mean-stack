//entry application
//routing
var express = require('express');
var app = express();

app.set('view engine','jade');
app.set('views','./views');  //templete 파일 디렉토리 지정
app.use(express.static('public'));
app.locals.pretty = true;  //code를 pretty하게 만들어줌
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

