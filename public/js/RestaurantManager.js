var headerList = document.getElementById('header-results');
var list = document.getElementById('results');
var description = document.getElementById('description');
var minStar = new Star("selected");
var maxStar = new Star("selected");
minStar.setValue(1);
maxStar.setValue(5);

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

function getNearbyRestaurants(callback){
  console.log("getNearbyRestaurants called");
  var service = new google.maps.places.PlacesService(map);
  var request = {
    bounds:map.getBounds()
  }
  console.log("params generated");
  service.nearbySearch(request, function(results,status){
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log("results are ok");
      var restaurants = [];
      for (var i = 0; i < results.length; i++) {
        console.log("result "+i+" = content:",results[i]);
        var result = results[i];
        var info = {
          restaurantName:result.name,
          lat: result.geometry.location.lat(),
          long: result.geometry.location.lng()
        };
        //var restaurant = new Restaurant(info);
      }
    } else console.log("results failed");
  });
}
function showRestaurants(){

  minStar.onUpdate = showRestaurants;
  maxStar.onUpdate = showRestaurants;
    description.textContent = "";
    description.appendChild(getFilterNode());
    list.textContent = "";
    headerList.textContent = "";
    restaurants.forEach(function(restaurant){
      var val = restaurant.getRatingAverage();
      if(minStar.value<=val && maxStar.value>=val)showRestaurant(restaurant);
    });
    getNearbyRestaurants();
    ActionBar.set(null,null);
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

  //alert("rest:"+restaurant.restaurantName+" {lat:"+restaurant.lat+", lon:"+restaurant.long+"}");
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
  description.textContent = "";
  headerList.textContent = "";
  restaurant.refresh = displayInfoRestaurant;
  description.appendChild(restaurant.createAddressNode());
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

function isVisible(marker){
  return map.getBounds().contains(marker.getPosition());
}
