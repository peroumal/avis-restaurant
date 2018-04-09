
var list = document.getElementById('results');
var description = document.getElementById('description');

function showRestaurants(){
    list.textContent = "";
    description.textContent = "";
    restaurants.forEach(function(restaurant){
      showRestaurant(restaurant);
    });
    ActionBar.set(ActionBar.HOME);
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
    displayInfoRestaurant(restaurant);
    restaurant.onSelected(map);
    toNormalScreen();
  });
  return restaurant.marker;
}

function displayInfoRestaurant(restaurant){
  list.textContent ="";
  ActionBar.set(restaurant.restaurantName,showRestaurants);
  list.appendChild(restaurant.createInfoNode());
}

function isVisible(marker){
  return map.getBounds().contains(marker.getPosition());
}
