var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "buntun",
    database : "WeCanEat"
    
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = `CREATE TABLE Business (
                ID int primary key AUTO_INCREMENT, 
                Name varchar(100) not null , 
                Picture varchar(100) not null ,
                Latitude float(10,2),
                Longitude float(10,2)
                )`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});