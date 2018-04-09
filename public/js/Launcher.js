var mode = "near";

$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
});

$.ajax({
    url: publicHtmlFolder+"assets/json/restaurants.json",
    async: false,
    dataType: "json",
    success: function(data){
      restaurants =[];
      data.forEach(function(e){
        restaurant = new Restaurant(e);
        restaurants.push(restaurant);
        //For offline test : appendRestaurant(restaurant);
      });
    }
});


function setRestaurantListDimension(){
  var actionBarHeight = window.getComputedStyle(
    document.getElementById("action-bar"))
    .getPropertyValue("height")
    .split("px")[0];

    var actionBarWidth = window.getComputedStyle(
      document.getElementById("action-bar"))
      .getPropertyValue("width")
      .split("px")[0];

  if(actionBarWidth*2>=window.innerWidth){
    document.getElementById("map").style.left = "0px";
    document.getElementById("map").style.width = (window.innerWidth)+"px";
  }else {
    document.getElementById("map").style.left = actionBarWidth+"px";
    document.getElementById("map").style.width = (window.innerWidth-actionBarWidth)+"px";
  }
  document.getElementById("map").style.height = (window.innerHeight)+"px";
  document.getElementById("restaurant-list").style.height = (window.innerHeight-actionBarHeight)+"px";
}

window.addEventListener("resize", setRestaurantListDimension);
window.addEventListener("load", setRestaurantListDimension);

function displayMap(lat,lng){
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: lat, lng: lng}
  });
  google.maps.event.addListener(map, 'bounds_changed', function() {
      if(mode == "near") showRestaurants();
  });
}

function toNormalScreen(){
  if (document.exitFullscreen) {
          document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
      }
}

function initMap() {
  if(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(function(pos){
      displayMap(pos.coords.latitude, pos.coords.longitude);
    },function(){
      displayMap(restaurants[0].lat,restaurants[0].long);
    });
   else displayMap(restaurants[0].lat,restaurants[0].long);
}
