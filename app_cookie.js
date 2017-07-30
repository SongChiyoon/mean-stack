var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser('21414125152134215124@#$!3213123'));

app.listen(3003, function(){
	console.log('3003 port!!');
});
var products = {
	1:{title : 'The history of Web'},
	2:{title : 'The next web'},
	3:{title : 'The new web'}
};
app.get('/products', function(req, res){
	var output = '';
	for(var name in products){
		output += `
			<li><a href="/cart/${name}">${products[name].title}</a></li>
		`
	}
	res.send(`<h1>Products</h1><ul>${output}</ul><a href="/cart">Cart</a>`)
	//res.send(`<h1>Products</h1><ul>${output}</ul><a href ="/cart">Cart</a>`);
});

app.get('/cart', function(req, res){
	var cart = req.signedCookies.cart;
	if(!cart){
		res.send('empty');
	} else{
		var output = "";
		for(var id in cart){
			output += `<li>${products[id].title} (${cart[id]})</li>`;
		}
		res.send(`<ul>${output}</ul>`);
	}
});

app.get('/count',function(req, res){
	if(req.signedCookies.count){
		var count = parseInt(req.signedCookies.count);
	}
	else{
		var count = 0;
	}
	count = count +1;
	res.cookie('count', count, {signed : true});
	res.send('count : '+ count);
});

app.get('/cart/:id', function(req, res){
	var id = req.params.id;
	var output = "";
	if(req.signedCookies.cart){
		var cart = req.signedCookies.cart;
		output = cart;
	}
	else{
		var cart = {};
	}
	if(!cart[id]){
		cart[id] = 0;
	}
	cart[id] = parseInt(cart[id])+1;
	console.log(cart[id]);
	res.cookie('cart', cart, {signed:true});
	res.redirect('/cart');
	//cart[id] = parseInt(cart[id]) + 1; 
	//res.send(cart);
});






