function Restaurant(restaurant){
  this.lat = restaurant.lat;
  this.long = restaurant.long;
  this.address = restaurant.address;
  this.restaurantName = restaurant.restaurantName;
  this.position = {lat: restaurant.lat, lng: restaurant.long};
  this.marker = null;
};

Restaurant.prototype.onSelected = function() {
  console.log("Restaurant : "+this.restaurantName+" selected");
  //displayRestaurantDesc();
},

Restaurant.prototype.displayRestaurantDesc = function(){
  var p= document.createElement("p");
  p.textContent = this.restaurantName;
  var list = document.getElementById('restaurant-list');
  list.textContent ="1234567";
}

Restaurant.prototype.isVisible = function () {

};
