function loadMap(){
  $.ajax({
      url: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCug_AnkBdLsHSH8jpkBz7OswF_tGdbRWQ&callback=initMap",
      async: true,
      dataType: "script",
      success:loadPlaceApi
  });
}

function loadPlaceApi(){
  $.ajax({
      url: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4-Zq7jdKl1arKQgOJ6FdA6to30l0-wzE&libraries=places",
      async: true,
      dataType: "script",
  });
}

function getDetailFrom(placeId,callback){
  var service = new google.maps.places.PlacesService(map);
  service.getDetails(
    { placeId: placeId },
    function(place, status) {
        callback(place);
    });
}

function getNearby(type,callback){
  console.log("getNearbyRestaurants called");
  var service = new google.maps.places.PlacesService(map);
  var request = {
    bounds:map.getBounds(),
    location:map.getCenter(),
    types: [type],
    rankby:"distance"
  }
  console.log("params generated");
  service.nearbySearch(request,callback);
}

function getPhotoUrlAt(lat,lon){
  var url = "https://maps.googleapis.com/maps/api/streetview?size=300x200&location="+lat+","+lon
    +"&heading=151.78&pitch=-0.76&key=AIzaSyCYySxyF4i7L47ENNw3TlUYTWkTKdl0Nlc";
    return url;
}

function getPositionInfo(pos,callback){
  $.ajax({
      url: "https://maps.googleapis.com/maps/api/geocode/json?latlng="+pos.lat+","+pos.lng+"&sensor=false"
      +"&key=AIzaSyDld6ekUWwY4GUuqC8UaaPjWmsAORmBCj4",
      async: true,
      dataType: "json",
      success:function(data){
        console.log("info:geopos",data);
        callback(data);
      }
  });
}
