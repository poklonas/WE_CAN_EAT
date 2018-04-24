var mysql = require('mysql');

var con = mysql.createConnection({
     host: "localhost",
     user: "buntun",
     database : "WeCanEat"
});

//////////////////////////////////////////////////
//   HOW  Another  js use ?                     // 
// 1 . var models = require('this file path');  //
// 2 . models.function(arg);                    //
//////////////////////////////////////////////////

  module.exports = {
          /* FIND ALL BUSINESS  */
          getAllBusiness : function(callback){ 
                con.query("SELECT * FROM Business", function (err, result) {
                   if (err) console.log(err);
                   callback(result);
                });
          },
          
          getSpecificBusiness : function(callback, bsID){
            // do someting to return all data about
            // business that has id == bsID
               return;
          },
          
          getAllTypes : function(callback){
                con.query("SELECT * FROM __Type", function (err, result) {
                   if (err) console.log(err);
                   callback(result);
                });
          },
          
          getAllBusinessWithType : function(callback, typeID){
            // do someting to return data that business have type id == type id
               return;
          },
          
          getAllFoodIn : function(callback, bsID){
            // return all food and that prize in that business that has id = bsID
               return;
          },
     
          insertBusiness : function(callback, newBS){
            // insert command in clude business type
            // and log data
          },
          
          insertType : function(callback, newTYPE){
           // var sql = ("INSERT INTO __Type (_Type) VALUES ("+newTYPE+")");
            //console.log(sql);
            //con.query(sql, function (err, result) {
            //  if (err) console.log(err);
            //  console.log("insert Complete");
            //});
            //var sql = "SELECT * FROM __Tag";
            //con.query(sql, function (err, result) {
          //    console.log(result);
          //    return result;
        //    });
            // insert new type
            // and log data
          },
          
          insertFood : function(callback, newFood){
            // insert command include foodtag 
            // and log data
          },
          
          insertMenu : function(callback, newMenu){
            // insert command 
            // and log data
          },
          
          insertTag : function(callback, newTag){
            // insert command 
            // and log data
          },
    
  }
