
function loadMapApi(){
  var element = document.getElementById("mapload");
  var url = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCug_AnkBdLsHSH8jpkBz7OswF_tGdbRWQ&callback=initMap";
  element.setAttribute("async","");
  element.setAttribute("defer","");
  element.setAttribute("src",url);
}
loadMapApi();
