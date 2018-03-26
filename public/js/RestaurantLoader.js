var publicHtmlFolder = "http://localhost:6060/avis_restaurant/public/"
var restaurants = [];
var map =null;
$.ajax({
    url: publicHtmlFolder+"assets/json/restaurants.json",
    async: false,
    dataType: "json",
    success: function(data){
      restaurants = data;
    }
});

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: restaurants[0].lat, lng: restaurants[0].long}
  });

  restaurants.forEach(function(r){
    var position = {lat: r.lat, lng: r.long};
    var marker = new google.maps.Marker({
      position: position,
      map: map
    });
  });
}
