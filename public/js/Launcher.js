var mode = "near";
$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
});

$.ajax({
    url: publicHtmlFolder+"assets/json/restaurants.json",
    async: false,
    dataType: "json",
    success: function(data){
      restaurants =[];
      data.forEach(function(e){
        restaurant = new Restaurant(e);
        restaurants.push(restaurant);
        //For offline test : appendRestaurant(restaurant);
      });
    }
});

function getDimensions(node){
  var style = window.getComputedStyle(node);
    var height = style.getPropertyValue("height").split("px")[0];
    var width = style.getPropertyValue("width").split("px")[0];
    return [height,width];
}

function setRestaurantListDimension(){
  var dimen = getDimensions(document.getElementById("action-bar"));
  var actionBarHeight = dimen[0];
  var actionBarWidth = dimen[1]

  var ah = (window.innerHeight-actionBarHeight);
  if(actionBarWidth*2>=window.innerWidth){
    document.getElementById("map").style.left = "0px";
    document.getElementById("map").style.width = (window.innerWidth)+"px";
  }else {
    document.getElementById("map").style.left = actionBarWidth+"px";
    document.getElementById("map").style.width = (window.innerWidth-actionBarWidth)+"px";
    document.getElementsByTagName("nav")[0].style.height = "100%";
  }
  document.getElementById("restaurant-list").style.height = ah+"px";
  document.getElementById("map").style.height = (window.innerHeight)+"px";
}

window.addEventListener("resize", setRestaurantListDimension);
window.addEventListener("load", setRestaurantListDimension);

function displayMap(lat,lng){

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: lat, lng: lng}
  });

  google.maps.event.addListener(map, 'bounds_changed', function() {
      if(mode == "near") showRestaurants();
  });

  map.addListener('click', function(e) {
    var pos = e.latLng;
      console.log(pos);
      addRestaurant(pos.lat(), pos.lng());
  });
}

function toNormalScreen(){
  if (document.exitFullscreen) {
          document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
      }
}


function insertInputField(container,title,placeholder){
  var label = document.createElement("label");
  label.textContent = title;
  label.classList = "input-label";
  var comment = document.createElement("input");
  comment.style.display ="block";
  comment.setAttribute("type","text");
  comment.classList = "input-text";
  comment.setAttribute("placeholder",placeholder);
  container.appendChild(label);
  container.appendChild(comment);
  return comment;
}

function initMap() {
  if(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(function(pos){
      displayMap(pos.coords.latitude, pos.coords.longitude);
    },function(){
      displayMap(restaurants[0].lat,restaurants[0].long);
    });
   else displayMap(restaurants[0].lat,restaurants[0].long);
}
