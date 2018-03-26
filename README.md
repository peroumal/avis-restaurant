# avis_restaurant
Projet 7 OpenClassRooms sur les avis de Restaurants par Rayan Peroumal

Afin d'utiliser ce projet il faut ajouter un fichier MapLoader.js dans le repertoire public/js/
Celui ci devra permettre le chargement de la map google map.

Voici un exemple de ce à quoi le fichier MapLoader.js pourrais ressembler :

// Début du Fichier MapLoader.js
$.ajax({
    url: "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap",
    async: true,
    dataType: "script",
});

// Fin du Fichier MapLoader.js
