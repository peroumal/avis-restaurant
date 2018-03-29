function Restaurant(restaurant){
  this.lat = restaurant.lat;
  this.long = restaurant.long;
  this.restaurantName = restaurant.restaurantName;
  this.position = {lat: restaurant.lat, lng: restaurant.long};
  this.marker = null;
};

Restaurant.prototype.onSelected = function() {
  console.log("Restaurant : "+this.restaurantName+" selected");
}
