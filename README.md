# avis_restaurant
Projet 7 OpenClassRooms sur les avis de Restaurants par Rayan Peroumal

Afin d'utiliser ce projet il faut ajouter un fichier MapLoader.js dans le repertoire public/js/
Celui ci devra permettre le chargement de la map google map.

Voici un exemple de ce à quoi le fichier MapLoader.js pourrais ressembler :

``` javascript

// For google maps first load and init
$.ajax({
    url: "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap",
    async: true,
    dataType: "script",
    success:loadPlaceApi
});

// For load Google Place API
function loadPlaceApi(){
  $.ajax({
      url: "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places",
      async: true,
      dataType: "script",
  });
}

// For Retrieve picture from streetview API
function getPhotoUrlAt(lat,lon){
  var url = "https://maps.googleapis.com/maps/api/streetview?size=300x200&location="+lat+","+lon
    +"&heading=151.78&pitch=-0.76&key=YOUR_API_KEY";
    console.log("url",url);
    return url;
}

// Get details linked to a place by his id
function getDetailFrom(placeId,callback){
  var url = "https://maps.googleapis.com/maps/api/place/details/json?placeid="+placeId
  +"&key="+"YOUR_API_KEY";
  $.ajax({
      url: url,
      dataType: "json",
      cache:false,
      success:callback
  });
}


```
