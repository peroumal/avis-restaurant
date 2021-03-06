var headerList = document.getElementById('header-results');
var list = document.getElementById('results');
var description = document.getElementById('description');
var minStar = new Star("selected");
var maxStar = new Star("selected");
minStar.setValue(1);
maxStar.setValue(5);
minStar.onUpdate = showRestaurants;
maxStar.onUpdate = showRestaurants;

function getFilter(){
    var container = document.createElement("div");
    var from = document.createElement("div");
    from.classList="white";
    from.textContent=" de ";
    var to = document.createElement("div");
    to.classList="white";
    to.textContent= " à "
    container.appendChild(from);
    container.appendChild(this.minStar.node);
    container.appendChild(to);
    container.appendChild(this.maxStar.node);
    return container;
};

function getNearbyRestaurants(){
  getNearby("restaurant",function(results,status){
    mapsRestaurants = [];
    if (status == google.maps.places.PlacesServiceStatus.OK)
      for (var i = 0; i < results.length; i++)
        mapsRestaurants.push(newRestaurantFromPlace(results[i]));
    else console.log("results failed");
    showRestaurants(true);
  });
}

function newRestaurantFromPlace(result){
  var info = {
    restaurantName:result.name,
    lat: result.geometry.location.lat(),
    long: result.geometry.location.lng(),
    address: result.vicinity,
    rating: result.rating,
    id: result.place_id,
    ratings: []
  };

  var restaurant = new Restaurant(info);

  return restaurant;
}

function newRestaurantFromDetail(result){
  var info = {
    restaurantName:result.name,
    lat: result.geometry.location.lat,
    long: result.geometry.location.lng,
    address: result.vicinity,
    rating: result.rating,
    id: result.place_id,
    ratings: []
  };

  var restaurant = new Restaurant(info);

  return restaurant;
}

function showRestaurants(offline){

  // Reinit to empty
  description.textContent = "";
  list.textContent = "";
  headerList.textContent = "";
  markers.forEach(function(marker){marker.setMap(null)});
  markers = [];
  ActionBar.set(null,null);

  // Add values
  description.appendChild(getFilter());
  restaurants.forEach(showRestaurant);
  mapsRestaurants.forEach(showRestaurant);
  if(!offline) getNearbyRestaurants();
}

function showRestaurant(restaurant){
  var rating = restaurant.getRatingAverage();
  var visible =  map.getBounds().contains(restaurant.position);
  if(visible && minStar.value<=rating && maxStar.value>=rating){
    markers.push(createRestaurantMarker(restaurant));
    appendRestaurant(restaurant);
  }
}

function appendRestaurant(restaurant){
  list.appendChild(restaurant.node);
}

function createRestaurantMarker(restaurant){

  //alert("rest:"+restaurant.restaurantName+" {lat:"+restaurant.lat+", lon:"+restaurant.long+"}");
  restaurant.marker = new google.maps.Marker({
    position: restaurant.position,
    map: map,
    title:restaurant.restaurantName
  });


  restaurant.marker.addListener('click', function(){
    goToRestaurant(restaurant);
  });
  return restaurant.marker;
}

function goToRestaurant(restaurant){
  map.setCenter(restaurant.marker.getPosition());
  map.setZoom(16);
  displayInfoRestaurant(restaurant);
  restaurant.onSelected(map);
  toNormalScreen();
}

function displayInfoRestaurant(restaurant){
  list.textContent ="";
  description.textContent = "";
  headerList.textContent = "";
  markers.forEach(function(marker){marker.setMap(null)});
  markers = [];
  markers.push(createRestaurantMarker(restaurant));
  restaurant.refresh = displayInfoRestaurant;
  var addrNode =restaurant.createAddressNode();
  addrNode.style.color = "#8C9EFF";
  description.appendChild(addrNode);
  headerList.appendChild(restaurant.createStreetViewNode());
  ActionBar.set(restaurant.restaurantName,showRestaurants);
  list.appendChild(restaurant.createInfoNode());
  setAdaptativeDimensions();
}

function addRestaurant(lat,long){
  var label = document.getElementById("exampleModalLabel");
  label.textContent = "Ajout d'un restaurant";
  var body = document.getElementById("modal-body");
  body.textContent ="";
  var comment = this.insertInputField(body,"Nom du restaurant","Nom du restaurant");
  var address = this.insertInputField(body,"Addresse du restaurant","Addresse du restaurant");
  var submit = document.getElementById("modal-submit");

  comment.addEventListener("input",function(){
    if(comment.value.length>0){
      submit.classList = "btn btn-primary";
      submit.textContent = "confirmer l'ajout";
      submit.onclick = function(){
          var data = {
            restaurantName:comment.value,
            address:address.value,
            lat:lat,
            long:long,
            ratings:[]
          }
          var rest = new Restaurant(data);
          restaurants.push(rest);
          createRestaurantMarker(rest);
          displayInfoRestaurant(rest);
      };
    } else {
      submit.classList = "btn btn-secondary";
      submit.textContent = "Annuler";
      submit.onclick=null;
    }
  });
  $('#exampleModal').modal('toggle');
  $('#exampleModal').modal('show');
}
