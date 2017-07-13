
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

// SELECT
/*
var sql = 'SELECT FROM topic WHERE @rid=:id';
var param = {   
	params :{//params 에 대한 약속임으로 꼭 지켜줘야한다.
		id:'#21:0'
	}
};
db.query(sql, param).then(function(results){
	console.log(results);
});
*/
//INSERT
/*
var sql = 'INSERT INTO topic (title, description) VALUES(:title, :desc)';
var param ={
  params : {
    title:'Express',
    desc:'Express is framework for WEB'
  }
};
db.query(sql, param).then(function(results){
  console.log(results);
}); */
//UPDATE
var sql = 'UPDATE topic SET title=:title WHERE @rid=:rid';
db.query(sql, {params:{title:'Expressjs', rid:'21:0'}}).then(function(results){
  console.log(results);
});
//DELETE
var sql = "DELETE FROM topic WHERE @rid=:rid";
db.query(sql, {params:{rid:'#21:0'}}).then(function(results){
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