var maps = new google.maps.Map(document.getElementById("map"),mapOptions);
var icon = {
    url: "/pic/icon-buffet-1.png", // url
    scaledSize: new google.maps.Size(30, 30), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(0,0) // anchor
};
var marker, i, info;
/*marker = new google.maps.Marker({
  position: {lat: 13.8218835, lng: 100.5145678},
  map: maps,
  icon: icon,
  title: 'ประตูหลังมหาวิทยาลัย'});
info = new google.maps.InfoWindow();
google.maps.event.addListener(marker, 'click', (function(marker, i) {
  return function() {
		info.setContent('<div class="logo">ประตูหลังมหาวิทยาลัย<br><a href=https://what-we-eat-buntun.c9users.io/detail>detail</a> </div>');
		info.open(maps, marker);
	}
})(marker, i));*/
marker = new google.maps.Marker({
  position: {lat: 13.8222615, lng: 100.5147167},
  map: maps,
  icon: icon,
  title: 'Saru Shabu'});
info = new google.maps.InfoWindow();
google.maps.event.addListener(marker, 'click', (function(marker, i) {
  return function() {
		info.setContent('<div class="picture">Saru Shabu <br>\
		                 <img src="/pic/sarushabu.jpg">\
		                 <a href=https://what-we-eat-buntun.c9users.io/detail >detail</a>\
		                 </div>');
		info.open(maps, marker);
	}
})(marker, i));
