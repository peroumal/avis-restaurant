function showRestaurant(restaurant){
  restaurant.marker = new google.maps.Marker({
    position: restaurant.position,
    map: map,
    title:restaurant.restaurantName
  });

  var p= document.createElement("p");
  p.textContent = restaurant.restaurantName;
  var list = document.getElementById('restaurant-list');
  list.appendChild(p);

  restaurant.marker.addListener('click', function(){
    map.setCenter(restaurant.marker.getPosition());
    map.setZoom(12);
    restaurant.onSelected(map)
  });
  //GLatLngBounds.containsLatLng(restaurant.lat,restaurant.long)
}
