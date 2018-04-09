# avis_restaurant
Projet 7 OpenClassRooms sur les avis de Restaurants par Rayan Peroumal

Afin d'utiliser ce projet il faut ajouter un fichier MapLoader.js dans le repertoire public/js/
Celui ci devra permettre le chargement de la map google map.

Voici un exemple de ce à quoi le fichier MapLoader.js pourrais ressembler :

``` javascript
$.ajax({
  url: "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap",
  async: true,
  dataType: "script",
});


function getPhotoUrlAt(lat,lon){

  var url = "https://maps.googleapis.com/maps/api/streetview?size=300x300&location="
    +lat
    +","
    +lon
    +"&heading=151.78&pitch=-0.76&key=AIzaSyCYySxyF4i7L47ENNw3TlUYTWkTKdl0Nlc";

    return url;
}
```
