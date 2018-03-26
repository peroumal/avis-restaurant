var publicHtmlFolder = "http://localhost:6060/avis_restaurant/public/"

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
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: restaurants[0].lat, lng: restaurants[0].long}
  });
  restaurants.forEach(function(restaurant){
    addRestaurant(new Restaurant(restaurant));
  });
}
