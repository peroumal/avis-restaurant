$.ajax({
    url: publicHtmlFolder+"assets/json/restaurants.json",
    async: false,
    dataType: "json",
    success: function(data){
      restaurants =[];
      data.forEach(function(restaurant){
        restaurants.push(new Restaurant(restaurant));
      });
    }
});

function initMap() {
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(pos){
      console.log("Youhou ! ça marche");
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {lat: pos.coords.latitude, lng: pos.coords.longitude}
      });
    },function(){
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {lat: restaurants[0].lat, lng: restaurants[0].long}
      });
    });

  }else {

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: restaurants[0].lat, lng: restaurants[0].long}
  });
}
  restaurants.forEach(function(restaurant){
    showRestaurant(new Restaurant(restaurant));
  });
}
