// โค้ดเรียกข้อมูลจาก database

var mysql = require('mysql');

var con = mysql.createConnection({
     host: "localhost",
     user: "buntun",
     database : "WeCanEat"
    
 });
 
 
con.connect(function(err) {
    if (err) console.log(err);
    console.log("Connected!");
    var sql1 =    `CREATE TABLE User (
                    ID int primary key auto_increment, 
                    Name varchar(255) not null , 
                    Email varchar(255) not null, 
                    Pswd varchar(255) not null,
                    UNIQUE (Email)
                );`;
    con.query(sql1, function (err, result) {
        if (err) console.log(err);
        console.log("User Table Complete");
    });
    
});