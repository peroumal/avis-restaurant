
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

function showRestaurants(){

  minStar.onUpdate = showRestaurants;
  maxStar.onUpdate = showRestaurants;
  //var filter = new Filter();
    description.textContent = "";
    description.appendChild(getFilterNode());
    list.textContent = "";
    restaurants.forEach(function(restaurant){
      var val = restaurant.getRatingAverage();
      if(minStar.value<=val && maxStar.value>=val)showRestaurant(restaurant);
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
  restaurant.refresh = displayInfoRestaurant;
  description.appendChild(restaurant.createStreetViewNode());
  ActionBar.set(restaurant.restaurantName,showRestaurants);
  list.appendChild(restaurant.createInfoNode());
}

function addRestaurant(lat,long){
  var body = document.getElementById("modal-body");
  body.textContent ="";
  var label = document.getElementById("exampleModalLabel");
  label.textContent = "Ajout d'un restaurant";

  var comment = document.createElement("input");
  comment.style.display ="block";
  comment.setAttribute("type","text");
  comment.classList = "comment";
  comment.setAttribute("placeholder","Nom du restaurant");
  body.appendChild(comment);

  var address = document.createElement("input");
  address.style.display ="block";
  address.classList = "address";
  address.setAttribute("placeholder","Addresse du retaurant");
  body.appendChild(address);
  var submit = document.getElementById("modal-submit");
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
    submit.onclick=null;
  };


  $('#exampleModal').modal('toggle');
  $('#exampleModal').modal('show');
}

function isVisible(marker){
  return map.getBounds().contains(marker.getPosition());
}
