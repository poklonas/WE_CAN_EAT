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
    var sql =    `CREATE TABLE Business (
                    ID int primary key auto_increment, 
                    Name varchar(100) not null , 
                    Picture varchar(100) not null ,
                    Latitude float(10,2),
                    Longitude float(10,2),
                );`;
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        console.log("Business Table Complete");
    });
    
    
    if (err) console.log(err);
    console.log("Connected!");
    var sql =    `CREATE TABLE FOOD (
                    ID int primary key auto_increment , 
                    Name varchar(100) not null 
                );`;
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        console.log("FOOD Table Complete");
    });
    
    
    if (err) console.log(err);
    console.log("Connected!");
    var sql =    `CREATE TABLE __Tag (
                    ID int primary key auto_increment ,
                    Tag int
                );`;
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        console.log("Tag Table Complete");
    });
    
    
    if (err) console.log(err);
    console.log("Connected!");
    var sql =    `CREATE TABLE FOOD__Tag (
                    ID int primary key auto_increment ,
                    FoodID int ,
                    _TagID int,
                    foreign key (FoodID) references FOOD(ID),
                    foreign key (_TagID) references __Tag(ID)
                );`;
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        console.log("FOOD_Tag Table Complete");
    });
    
    
    if (err) console.log(err);
    console.log("Connected!");
    var sql =    `CREATE TABLE BUSI_FOOD (
                ID int primary key auto_increment ,
                BusinessID int ,
                FoodID int,
                price int,
                foreign key (BusinessID) references Business(ID),
                foreign key (FoodID) references FOOD(ID)
                );`;
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        console.log("BUSI_FOOD Table Complete");
    });
    
    console.log("Connected!");
    var sql =    `CREATE TABLE __Type (
                ID int primary key auto_increment ,
                _Type varchar(100) not null ,
                );`;
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        console.log("__Type Table Complete");
    });
    
    console.log("Connected!");
    var sql =    `CREATE TABLE BUSI_Type (
                ID int primary key auto_increment, 
                BusinessID int , 
                TypeID int ,
                foreign key (BusinessID) references Business(ID),
                foreign key (TypeID) references __Type(ID)
                );`;
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        console.log("BUSI_Type Table Complete");
    });
});