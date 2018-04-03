$.ajax({
    url: publicHtmlFolder+"assets/json/restaurants.json",
    async: false,
    dataType: "json",
    success: function(data){
      restaurants =[];
      data.forEach(function(restaurant){
        restaurants.push(new Restaurant(restaurant));
        var p= document.createElement("p");
        p.textContent = this.restaurantName;
        var list = document.getElementById('restaurant-list');
        list.textContent ="1234567";
      });
    }
});

function displayMap(lat,lng){
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: lat, lng: lng}
  });
  restaurants.forEach(function(restaurant){
    showRestaurant(restaurant);
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
