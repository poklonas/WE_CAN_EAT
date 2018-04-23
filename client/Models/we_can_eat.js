var mysql = require('mysql');

var con = mysql.createConnection({
     host: "localhost",
     user: "buntun",
     database : "WeCanEat"
    
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = `SELECT * FROM Business`;
  con.query(sql, function (err, result) {
     if (err) throw err;
     console.log(result);
     console.log("Complete");
   });
});

/////////////////////////////////////////////////
//   HOW  Another  js use ?                    // 
// 1 . var models = require('this path');      //
// 2 . models.funciotn1(arg).function2(arg);   //
// * function1 = get or insert                 //
// * function2 = all function in set funciotn1 //
/////////////////////////////////////////////////
module.exports = {
     getSet : {
          getAllBusiness : function(){
            // do someting to return all data business
               return ;   
          },
          
          getSpecificBusiness : function(bsID){
            // do someting to return all data about
            // business that has id == bsID
               return;
          },
          
          getAllBusinessWithType : function(typeID){
            // do someting to return data that business have type id == type id
               return;
          },
          
          getAllFoodIn : function(bsID){
            // return all food and that prize in that business that has id = bsID
               return;
          },
     },
     
     insertSet : {
          insertBusiness : function(newBS){
            // insert command in clude business type
            // and log data
          },
          
          insertType : function(newTYPE){
            // insert new type
            // and log data
          },
          
          insertFood : function(newFood){
            // insert command include foodtag 
            // and log data
          },
          
          insertMenu : function(newMenu){
            // insert command 
            // and log data
          },
          
          insertTag : function(newTag){
            // insert command 
            // and log data
          },
     },
}


// ** ยังไม่ได้ลองใดๆ ทั้งนั้น แค่เขียนที่คิดว่า น่าจะต้องทำ