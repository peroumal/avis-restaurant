
var list = document.getElementById('restaurant-list');
function showRestaurants(){
    list.textContent = "";
    restaurants.forEach(function(restaurant){
      showRestaurant(restaurant);
    });
}

function showRestaurant(restaurant){
  var marker = createRestaurantMarker(restaurant);
  if(isVisible(marker)){
    var p= document.createElement("p");
    p.textContent = restaurant.restaurantName;
    list.appendChild(p);
  }
}

function createRestaurantMarker(restaurant){
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
  return restaurant.marker;
}

function isVisible(marker){
    return map.getBounds().contains(marker.getPosition());
}
