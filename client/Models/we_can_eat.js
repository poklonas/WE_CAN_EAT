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
    var query = "SELECT b.*, t._Type, t.ID as TypeID\
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
    var query = "SELECT bf.*, f.Name\
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
    var lng = objBusi.lng;
    var query = "INSERT INTO Business (Name,Picture,Latitude,Longitude) \
                 VALUES ('"+name+"','"+pic+"','"+lat+"','"+lng+"');"; 
    con.query( query, function (err, result) {
        if (err) console.log(err);
        callback(result);
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
                 VALUES ('"+bsID+"','"+typeID+"');"; 
    con.query( query, function (err, result) {
        if (err) console.log(err);
        callback("Success");
    });
} 

function insertMenu(callback, obj, id){
    var len = obj["id"].length;
    for (var i = 0; i < len; i++) { 
        var query = "INSERT INTO BUSI_FOOD (BusinessID,FoodID,price) \
                     VALUES ('"+id+"','"+obj["id"][i]+"','"+obj["price"][i]+"');"; 
        con.query( query, function (err, result) {if (err) console.log(err) });
    }
    callback();
} 


function deleteFood(callback, id){
    var query = "DELETE FROM FOOD WHERE ID =" + id + ";"; 
    con.query( query, function (err, result) {
        if (err) console.log(err);
        callback("Success");
    });
};

function deleteBusiness(callback, id){
    var query = "DELETE FROM Business WHERE ID =" + id + ";"; 
    con.query( query, function (err, result) {
        if (err) console.log(err);
        callback("Success");
    });
};

function deleteFoodBusiness(callback, id){
    var query = "DELETE FROM BUSI_FOOD WHERE ID =" + id + ";"; 
    con.query( query, function (err, result) {
        if (err) console.log(err);
        callback("Success");
    });
};

function getLastId(callback){
    var query = "SELECT LAST_INSERT_ID() as lastID;";
    con.query( query, function (err, result) {
        if (err) console.log(err);
        callback(result);
    });             
}

function update_business_name(callback, id, newName){
    var query = "UPDATE Business \
                 SET Name = '"+ newName +"' \
                 WHERE ID = "+ id +";";
    con.query( query, function (err, result) {
        if (err) console.log(err);
        callback();
    });  
}
    
function update_business_menu(callback, obj){
    Object.keys(obj).forEach(function(key) {
        var query = "UPDATE BUSI_FOOD \
                   SET price = '"+ obj[key] +"' \
                   WHERE ID = "+ key +";";
        con.query( query, function (err, result) {if (err) console.log(err) });
    });
    callback();
}

function update_business_pic(callback, id, path){
    var query = "UPDATE Business \
                 SET Picture = '"+ path +"' \
                 WHERE ID = "+ id +";";
    con.query( query, function (err, result) {
        if (err) console.log(err);
        callback();
    });  
}

var counter = 2;

module.exports = {
    getAllBusiness: getAllBusiness,
    getAllTypes: getAllTypes,
    getSpecificBusiness : getSpecificBusiness,
    getAllFoodIn : getAllFoodIn, 
    getAllFood : getAllFood,
    getAllTypes : getAllTypes,
    getAllBusinessWithType : getAllBusinessWithType,
    getLastId : getLastId,
    insertFood : insertFood,
    insertType : insertType,
    insertMenu : insertMenu,
    insertBusiType : insertBusiType,
    insertBusiness : insertBusiness,
    deleteFood : deleteFood,
    deleteBusiness : deleteBusiness,
    deleteFoodBusiness : deleteFoodBusiness,
    update_business_name : update_business_name,
    update_business_menu: update_business_menu,
    update_business_pic : update_business_pic,
};