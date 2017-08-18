var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');   // session의 정보를 memory에다가 저장한다.  -> app을 껏다키면 날라간다
var app = express();
var OrientoStore = require('connect-oriento')(session);

app.use(bodyParser.urlencoded({extended:false}));  //body parser 등록
app.set('trust proxy', 1) // trust first proxy

app.listen(3003, function(){
	console.log("port 3003 connect!");
});
app.use(session({
  secret: '12414asfas1234124',   //session id를 숨겨줌
  resave: false,  
  saveUninitialized: true,
  store: new OrientoStore({
  	server:"host=localhost&port=2424&username=root&password=123222&db=o2"
  })
}));
 
app.get('/count', function(req, res){
	if(req.session.count){
		req.session.count++;
		
	}else{
		req.session.count = 1;
	}
	res.send("count :"+req.session.count);
});

app.get('/welcome', function(req, res){
	if(req.session.displayname){
		res.send(`
			<h1>hello, ${req.session.displayname}</h1>
			<a href="/auth/logout">logout</a>
			`);
	}else{
		res.send(`
			<h1>welcome</h1>
			<a href="/auth/login">login</a>	
			`)
	}
});
app.get('/auth/logout', function(req, res){
	delete req.session.displayname;
	seq.session.save(function(){ //저장후에 콜백함수
		res.redirect('/welcome');
	});
});
//기본적으로 express는 post를 처리해주지 않는다 -> body-parser사용!
app.post('/auth/login', function(req, res){
	console.log("error detect");
	var user ={
		username : 'song',
		password : '123222'
	}
	var id = req.body.id;
	var pw = req.body.pw;
	if(id === user.username && pw === user.password){
		req.session.displayname = user.username;
		seq.session.save(function(){ //저장후에 콜백함수
			res.redirect('/welcome');

		});
	}
	else{
		res.send('Who are you? <a href="/auth/login">login</a>');
	}

});
app.get('/auth/login', function(req, res){

	var output = `
		<h1>Login</h1>
		<form action='/auth/login' method="post">
			<p>
				<input type='text' name='id' placeholder='username'>
			</p>
			<p>
				<input type='password' name='pw' placeholder='password'>
			</p>
			<p>
				<input type='submit'>
			</p>
		</form>
	`;
	res.send(output);
});
app.get('/tmp', function(req, res){
	res.send('resut : '+req.session.count);
});