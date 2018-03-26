var publicHtmlFolder = "http://localhost:6060/avis_restaurant/public/"
var restaurants = [];
$.ajax({
    url: publicHtmlFolder+"assets/json/restaurants.json",
    async: false,
    dataType: "json",
    success: function(data){
      restaurants = data;
    }
});

function initMap() {
  var r = restaurants[0];
  var uluru = {lat: r.lat, lng: r.long};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: uluru
  });
  
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });

}
