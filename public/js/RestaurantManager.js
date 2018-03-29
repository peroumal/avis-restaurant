function showRestaurant(restaurant){
  restaurant.marker = new google.maps.Marker({
    position: restaurant.position,
    map: map,
    title:restaurant.restaurantName
  });
  restaurant.marker.addListener('click', function(){
    map.setCenter(restaurant.marker.getPosition());
    map.setZoom(12);
    restaurant.onSelected(map)
  });
}
