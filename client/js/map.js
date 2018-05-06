function initMap(){
  var maps = new google.maps.Map(document.getElementById("map"),mapOptions);
  return maps
}

function showPositon(){
  var GeoMarker = new GeolocationMarker();
  google.maps.event.addListenerOnce(GeoMarker, 'position_changed', function() {
    maps.panTo(this.getPosition());
    maps.fitBounds(this.getBounds());
    maps.setZoom(18);
  });
  GeoMarker.setMap(maps);
  window.scroll(0,0);
}

var icon = {
    url: "/pic/icon-buffet-1.png", // url
    scaledSize: new google.maps.Size(30, 30), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(0,0) // anchor
};

var infowindow = new google.maps.InfoWindow();
var marker, dmarker, i;
var markers = [];

function initMarker() {
  for (i = 0; i < BUSIList.length; i++) {
    marker = new google.maps.Marker({
      position: {lat: Number(BUSIList[i].Latitude), lng: Number(BUSIList[i].Longitude)},
      map: maps,
      icon: icon,
      title: BUSIList[i].Name});
    markers.push(marker);
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
    		infowindow.setContent('<div class="picture">'+BUSIList[i].Name+'<br>\
    		                <img src=/pic/PicBusiness/'+BUSIList[i].Picture.split('/').pop()+'>\
    		                <a href=https://what-we-eat-buntun.c9users.io/detail/'+BUSIList[i].ID+'>detail</a>\
    		                </div>');
    		infowindow.open(maps, marker);
    		maps.panTo({lat: Number(BUSIList[i].Latitude), lng: Number(BUSIList[i].Longitude)}); 
    	}
    })(marker, i));
  }
}

function initPointMarker() {
  dmarker = new google.maps.Marker({
    position: {lat: 13.8218835, lng: 100.5145678},
    draggable: true,
    map: maps,
    icon: icon,
    title: "Business Location"});
  google.maps.event.addListener(dmarker, 'dragend', (function(dmarker) {
    return function() {
      var pos = dmarker.getPosition();
      document.getElementById("inputLat").value = pos.lat();
      document.getElementById("inputLng").value = pos.lng();
    }
  })(dmarker));
}

function changeLat(lat){
  var pos = new google.maps.LatLng(Number(lat), dmarker.getPosition().lng());
  dmarker.setPosition(pos);
}

function changeLng(lat){
  var pos = new google.maps.LatLng(dmarker.getPosition().lat(), Number(lat));
  dmarker.setPosition(pos);
}

function getLatLng(marker){
  var pos = marker.getPosition();
  document.getElementById("inputLat").value = pos.lat;
  document.getElementById("inputLng").value = pos.lng;
}

var hiddenType = new Set();
function filterMark(tid) {
  for (var i = 0; i < hiddenType.size; i++) {
    if (hiddenType.has(tid)) {
      showType(tid);
      return
    }
  }
  hideType(tid);
}

function showType(tid){
  hiddenType.delete(tid);
  for (var i = 0; i < markers.length; i++) {
    if (BUSIList[i].TypeID == tid)
      markers[i].setMap(maps);
      var btn=document.getElementById("Type_"+tid)
      btn.style.color = 'white';
      btn.style.backgroundColor = '#333';
  }  
}

function hideType(tid){
  hiddenType.add(tid);
  for (var i = 0; i < markers.length; i++) {
    if (BUSIList[i].TypeID == tid)
      markers[i].setMap(null);
      var btn=document.getElementById("Type_"+tid)
      btn.style.color = '#999';
      btn.style.backgroundColor = '#000';
  }
}

function showAll() {
  for (var i = 0; i < TypeList.length; i++) {
    showType(TypeList[i].ID);
  }
}

function hideAll() {
  for (var i = 0; i < TypeList.length; i++) {
    hideType(TypeList[i].ID);
  }
}