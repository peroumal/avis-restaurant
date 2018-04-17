var mode = "near";
var lastPos={};
var country=null;
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

function showMapFrom(left){

    document.getElementById("map").style.left = left+"px";
    document.getElementById("map").style.width = (window.innerWidth-left)+"px";
}

function setAdaptativeDimensions(){
  var dimen = getDimensions(document.getElementById("action-bar"));
  var actionBarHeight = dimen[0];
  var actionBarWidth = dimen[1]
  showMapFrom(actionBarWidth);

  document.getElementById("restaurant-list").style.height = (window.innerHeight-actionBarHeight)+"px";
  document.getElementById("map").style.height = document.documentElement.scrollHeight+"px";
}

window.addEventListener("resize", setAdaptativeDimensions);
window.addEventListener("load", setAdaptativeDimensions);

function displayMap(lat,lng){

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: lat, lng: lng}
  });

  google.maps.event.addListener(map, 'bounds_changed', function() {
      if(ActionBar.title==null) showRestaurants();
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
      lastPos = {lat:pos.coords.latitude,lng:pos.coords.longitude};
      getPositionInfo(lastPos,function(data){
        var addresses = data[data.length-1].address_components;
        for(var i=0;i<addresses.length;i++){
          var addr = addresses[i];
          if(addr.types.includes("country")){
            country = addr.short_name;
          }
        }
        console.log("bounds-country",country);
      });

      displayMap(lastPos.lat, lastPos.lng);
    },function(){
      displayMap(restaurants[0].lat,restaurants[0].long);
    });
   else displayMap(restaurants[0].lat,restaurants[0].long);
}
