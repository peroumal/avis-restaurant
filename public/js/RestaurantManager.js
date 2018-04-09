
var list = document.getElementById('results');
var description = document.getElementById('description');
var minStar = new Star();
var maxStar = new Star();
minStar.setValue(1);
maxStar.setValue(4);

function getFilterNode(){
    var container = document.createElement("div");
    var h6 = document.createElement("h6");
    h6.textContent = "Afficher les restaurants notés entre : " ;
    container.appendChild(h6);
    container.appendChild(this.minStar.node);
    container.appendChild(document.createTextNode(" et "));
    container.appendChild(this.maxStar.node);
    return container;
};

function showRestaurants(){
  //var filter = new Filter();
    description.textContent = "";
    description.appendChild(getFilterNode());
    list.textContent = "";
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
