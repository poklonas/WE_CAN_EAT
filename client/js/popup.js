function popupConfirm(warn, succPath, failPath) {
    if (confirm(warn)) {
      window.location.href  = succPath;
    } else {
      return false;
    }
}

function popupEditBusiName(ele, updateEle, id=''){
  var element = document.getElementById(ele);
  var edit = prompt('The new business name is : ', "");
  if (edit == null || edit == "") {
    return false;
  } else {
    element.innerHTML = 'New Name is : '+edit;
    var insertEle = document.getElementById(updateEle);
    var str = "<form action='/update/busi_name/"+ id +"' method='post'> \
                <input type='hidden' name='newName' value="+edit+"> \
                <input type='submit' value='Update'>  \
                </form> "
    insertEle.insertAdjacentHTML("beforeend", str );
  } 
}