# avis_restaurant
Projet 7 OpenClassRooms sur les avis de Restaurants par Rayan Peroumal

Afin d'utiliser ce projet il faut ajouter un fichier MapLoader.js dans le repertoire public/js/
Celui ci devra permettre le chargement de la map google map.

Voici un exemple de ce à quoi le fichier MapLoader.js pourrais ressembler :

``` javascript

// For google maps
$.ajax({
  url: "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap",
  async: true,
  dataType: "script",
});

// For google place
$.ajax({
    url: "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places",
    async: true,
    dataType: "script",
});

// For streetview
function getPhotoUrlAt(lat,lon){
  var url = "https://maps.googleapis.com/maps/api/streetview?size=300x300&location="
    +lat
    +","
    +lon
    +"&heading=151.78&pitch=-0.76&key=YOUR_API_KEY";

    return url;
}

```
