var list = document.getElementById("restaurant-list");
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
  var height = window.innerHeight-actionBarHeight;
  list.style.height = height+"px";
  console.log("resizing",height);
}

window.addEventListener("resize", setRestaurantListDimension);
window.addEventListener("load", setRestaurantListDimension);

function displayMap(lat,lng){
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: lat, lng: lng}
  });
  google.maps.event.addListener(map, 'bounds_changed', function() {
      showRestaurants();
  });
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
