// สำหรับที่จะใช้ในการ สร้าง ช่อง input ทีมีการ log ค่าเอาไว้แล้วเป็น อาหาร
// ที่ผู้ใช้เลือกมา  และ มีช่องกำหนดราคา และ
function addSelectedFood(){
  var showList = document.getElementById("selectedF");
  var selectChoice = document.getElementById("Selected");
  var foodID = selectChoice.getAttribute("value");
  var strUser = selectChoice.options[selectChoice.selectedIndex].text;
  var str = "<input type='text' name='name' id="+foodID+" value = "+strUser+"></input> \
             <input type='text' name='price' id=price_"+foodID+" value = "+0+"></input> \
             <button id=button_"+foodID+" type=button onclick=deleteSelectedFood("+foodID+")>DELETE</button>\
             <br id=br_"+foodID+">"
  showList.insertAdjacentHTML("beforeend", str );
}

// สำหรับที่ใช้ในการเพิ่มช่อง Input สำหรับ เพิ่มอาหารใหม่ที่
// ยังไม่เคยปรากฏ ขึ้นมาและกำหนดราคาสำหรับร้าน
function deleteSelectedFood(foodID){
  var button = document.getElementById("button_"+foodID);
  var input = document.getElementById(foodID);
  var br = document.getElementById("br_"+foodID);
  var price = document.getElementById("price_"+foodID);
  input.parentNode.removeChild(input);
  button.parentNode.removeChild(button);
  br.parentNode.removeChild(br);
  price.parentNode.removeChild(price);
}