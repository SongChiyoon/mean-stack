
var OrientDB = require('orientjs');

var server = OrientDB({
   host:       'localhost',
   port:       2424,
   username:   'root',
   password:   '123222'
});

var db = server.use('o2');

//READ
var sql = 'SELECT FROM topic';
db.query(sql).then(function(results){
	console.log(results);
});

//
var sql = 'SELECT FROM topic WHERE @rid=:id';
var param = {   
	params :{//params 에 대한 약속임으로 꼭 지켜줘야한다.
		id:'#21:0'
	}
};
db.query(sql, param).then(function(results){
	console.log(results);
});
/*
var rec = db.record.get('#21:0')
   .then(
      function(record){
         console.log('Loaded Record:', record);
       }
   );  //record API
*/
 /* 
    * CREATE
    * READ
    * UPDATE
    * DELETE

    * CRUD
  */