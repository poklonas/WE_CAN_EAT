var mysql = require('mysql');

var con = mysql.createConnection({
     host: "localhost",
     user: "buntun",
     database : "WeCanEat",
});

///////////////////////////////////////////////////////////
//   HOW  Another  js use ?                              // 
// 1 . var models = require('this file path');           //
// 2 . models.functionName(function(val1){ });           //
///////////////////////////////////////////////////////////

function getAllBusiness(callback){
    //var query = "SELECT * FROM Business";
     var query = "SELECT *\
                  FROM Business as b \
                  INNER JOIN BUSI_Type as bt ON b.ID = bt.BusinessID \
                  INNER JOIN __Type as t ON bt.TypeID = t.ID";
    con.query(query , function (err, result) {
        if (err) console.log(err);
        callback(result);
    });
}

function getAllTypes(callback){
    var query = "SELECT * FROM __Type";
    con.query(query , function (err, result) {
        if (err) console.log(err);
        callback(result);
    });
}

function getSpecificBusiness(callback, bsID){ 
    var query = "SELECT * FROM Business WHERE ID = "+bsID;
    con.query(query , function (err, result) {
        if (err) console.log(err);
        callback(result);
    });
}

function getAllFoodIn (callback, bsID){
    var query = "SELECT *\
                 FROM BUSI_FOOD as bf \
                 INNER JOIN FOOD as f ON bf.FoodID = f.id \
                 and bf.BusinessID ="+ bsID + ";";
    con.query( query, function (err, result) {
        if (err) console.log(err);
        callback(result);
    });
}

function getAllFood (callback){
    var query = "SELECT * FROM FOOD;";
    con.query( query, function (err, result) {
        if (err) console.log(err);
        callback(result);
    });
}

function getAllTypes (callback){
    var query = "SELECT * FROM __Type;";
    con.query( query, function (err, result) {
        if (err) console.log(err);
        callback(result);
    });
}

function getAllBusinessWithType (callback, typeID){
    var query = "SELECT *\
                 FROM Business as b \
                 INNER JOIN BUSI_Type as bt ON b.ID = bt.BusinessID \
                 and bt.TypeID ="+ typeID + ";";
    con.query( query, function (err, result) {
        if (err) console.log(err);
        callback(result);
    });
}

function insertFood (callback, name){
    var query = "INSERT INTO FOOD (Name) VALUES ('"+name+"');"; 
    con.query( query, function (err, result) {
        if (err) console.log(err);
        callback("Success");
    });
}

function insertBusiness (callback, objBusi){
    var name = objBusi.name;
    var pic = objBusi.pic;
    var lat = objBusi.lat;
    var long = objBusi.long;
    var query = "INSERT INTO Business (Name,Picture,Latitude,Longitude) \
                 VALUES ('"+name+"','"+pic+"','"+lat+"','"+long+"');"; 
    con.query( query, function (err, result) {
        if (err) console.log(err);
        callback("Success");
    });
}

function insertType(callback, typeName){
    var query = "INSERT INTO __Type (_Type) VALUES ('"+typeName+"');"; 
    con.query( query, function (err, result) {
        if (err) console.log(err);
        callback("Success");
    });
}

function insertBusiType(callback, bsID, typeID){
    var query = "INSERT INTO BUSI_Type (BusinessID, TypeID) \
                 VALUES ("+bsID+","+typeID+");"; 
    con.query( query, function (err, result) {
        if (err) console.log(err);
        callback("Success");
    });
}


function deleteFood(callback, id){
    var query = "DELETE FROM FOOD WHERE ID =" + id + ";"; 
    con.query( query, function (err, result) {
        if (err) console.log(err);
        callback("Success");
    });
};


var counter = 2;

module.exports = {
    getAllBusiness: getAllBusiness,
    getAllTypes: getAllTypes,
    getSpecificBusiness : getSpecificBusiness,
    getAllFoodIn : getAllFoodIn, 
    getAllFood : getAllFood,
    getAllTypes : getAllTypes,
    getAllBusinessWithType : getAllBusinessWithType,
    insertFood : insertFood,
    insertType : insertType,
    insertBusiType : insertBusiType,
    insertBusiness : insertBusiness,
    deleteFood : deleteFood,
    counter: counter,
};

