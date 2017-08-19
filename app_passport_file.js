var express = require('express');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var bodyParser = require('body-parser');
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: '1234DSFs@adf1234!@#$asd',
  resave: false,
  saveUninitialized: true,
  store:new FileStore(),
}));
app.use(passport.initialize()); //passport 초기화
app.use(passport.session()); //passport use 세팅  session use 코드 아랫단에 붙어야한다. (session을 사용하기 위한것임으로)

app.get('/count', function(req, res){
  if(req.session.count) {
    req.session.count++;
  } else {
    req.session.count = 1;
  }
  res.send('count : '+req.session.count);
});
app.get('/auth/logout', function(req, res){
  req.logout();
  req.session.save(function(){
  	res.redirect('/welcome');
  })
  
});
app.get('/welcome', function(req, res){
  if(req.user && req.user.displayName) {
    res.send(`
      <h1>Hello, ${req.user.displayName}</h1>
      <a href="/auth/logout">logout</a>
    `);
  } else {
    res.send(`
      <h1>Welcome</h1>
      <ul>
        <li><a href="/auth/login">Login</a></li>
        <li><a href="/auth/register">Register</a></li>
      </ul>
    `);
  }
});
// app.post('/auth/login', function(req, res){
//   var uname = req.body.username;
//   var pwd = req.body.password;
//   for(var i=0; i<users.length; i++){
//     var user = users[i];
//     if(uname === user.username) {
//       return hasher({password:pwd, salt:user.salt}, function(err, pass, salt, hash){
//         if(hash === user.password){
//           req.session.displayName = user.displayName;
//           req.session.save(function(){
//             res.redirect('/welcome');
//           })
//         } else {
//           res.send('Who are you? <a href="/auth/login">login</a>');
//         }
//       });
//     }
//   }
//   res.send('Who are you? 2<a href="/auth/login">login</a>');
// });

passport.serializeUser(function(user, done) {   //passport session 관리방법 
	console.log("serializeUser",user);
  	done(null, user.username);  //username 이 session에 저장된다. 
});

passport.deserializeUser(function(id, done) {
	console.log("deserializeUser", id);
		for(var i=0; i<users.length; i++){
			var user = users[i];
			if(user.username === id){
				return done(null, user);   //이 user가 req의 user객체로 변환된다.
			}
	}
	
});

//사용자가 맞는지 절차
passport.use(new LocalStrategy(
	function(username, password, done){
		var uname = username;
	  	var pwd = password;
	  	for(var i=0; i<users.length; i++){
		    var user = users[i];
		    if(uname === user.username) {
		      return hasher({password:pwd, salt:user.salt}, function(err, pass, salt, hash){
		        if(hash === user.password){
		        	console.log('LocalStrategy', user);
			          done(null, user); //로그인 성공. //null은 몬가? error처리 
			          
		        } else {
		        	done(null, false);  //로그인 실패 
		        }
		      });
		    }
	  }
	  done(null, false);
	}
));
app.post('/auth/login',
	//middleware   return value 를  callback 함수로 return 
  passport.authenticate('local',   //위암한다/
  	{ 
  		successRedirect: '/welcome',
        failureRedirect: '/auth/login',
        failureFlash: false 
    })
);
//만약 페이스북 계정으로 로그인 한다면.
/*
app.post('/auth/login/facebook',
	//middleware   return value 를  callback 함수로 return 
  passport.authenticate('facebook',   //위암한다/
  	{ 
  		successRedirect: '/welcome',
        failureRedirect: '/auth/login',
        failureFlash: false 
    })
);*/
var users = [
  {
    username:'egoing',
    password:'mTi+/qIi9s5ZFRPDxJLY8yAhlLnWTgYZNXfXlQ32e1u/hZePhlq41NkRfffEV+T92TGTlfxEitFZ98QhzofzFHLneWMWiEekxHD1qMrTH1CWY01NbngaAfgfveJPRivhLxLD1iJajwGmYAXhr69VrN2CWkVD+aS1wKbZd94bcaE=',
    salt:'O0iC9xqMBUVl3BdO50+JWkpvVcA5g2VNaYTR5Hc45g+/iXy4PzcCI7GJN5h5r3aLxIhgMN8HSh0DhyqwAp8lLw==',
    displayName:'Egoing'
  }
];
app.post('/auth/register', function(req, res){
  hasher({password:req.body.password}, function(err, pass, salt, hash){
    var user = {
      username:req.body.username,
      password:hash,
      salt:salt,
      displayName:req.body.displayName
    };
    users.push(user);
    req.login(user, function(err){
    	res.redirect('/welcome');
    });
    
  });
});
app.get('/auth/register', function(req, res){
  var output = `
  <h1>Register</h1>
  <form action="/auth/register" method="post">
    <p>
      <input type="text" name="username" placeholder="username">
    </p>
    <p>
      <input type="password" name="password" placeholder="password">
    </p>
    <p>
      <input type="text" name="displayName" placeholder="displayName">
    </p>
    <p>
      <input type="submit">
    </p>
  </form>
  `;
  res.send(output);
});
app.get('/auth/login', function(req, res){
  var output = `
  <h1>Login</h1>
  <form action="/auth/login" method="post">
    <p>
      <input type="text" name="username" placeholder="username">
    </p>
    <p>
      <input type="password" name="password" placeholder="password">
    </p>
    <p>
      <input type="submit">
    </p>
  </form>
  `;
  res.send(output);
});
app.listen(3003, function(){
  console.log('Connected 3003 port!!!');
});