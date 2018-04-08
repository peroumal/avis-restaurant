
var list = document.getElementById('restaurant-list');

function showRestaurants(){
    list.textContent = "";
    restaurants.forEach(function(restaurant){
      showRestaurant(restaurant);
    });
    ActionBar.back = null;
}

function showRestaurant(restaurant){
  var marker = createRestaurantMarker(restaurant);
  if(isVisible(marker))
    appendRestaurant(restaurant);
}

function appendRestaurant(restaurant){
  list.appendChild(restaurant.node);
}

function createRestaurantMarker(restaurant){
  restaurant.marker = new google.maps.Marker({
    position: restaurant.position,
    map: map,
    title:restaurant.restaurantName
  });

  restaurant.marker.addListener('click', function(){
    mode = "discover";
    map.setCenter(restaurant.marker.getPosition());
    map.setZoom(16);
    displayInfoRestaurant(restaurant)
    restaurant.onSelected(map)
  });
  return restaurant.marker;
}

function displayInfoRestaurant(restaurant){
  list.textContent ="";
  ActionBar.set(restaurant.restaurantName);
  ActionBar.back = function(){
    showRestaurants();
    console.log("back called");
  };
  list.appendChild(restaurant.createInfoNode());
}

function isVisible(marker){
  return map.getBounds().contains(marker.getPosition());
}
