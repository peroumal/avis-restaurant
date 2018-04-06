function Restaurant(restaurant){
  this.lat = restaurant.lat;
  this.long = restaurant.long;
  this.address = restaurant.address;
  this.ratings = restaurant.ratings;
  this.star = new Star(this.getRatingAverage());
  this.restaurantName = restaurant.restaurantName;
  this.position = {lat: restaurant.lat, lng: restaurant.long};
  this.marker = null;
  this.createNode();
};


Restaurant.prototype.createNode = function() {
  var container= document.createElement("div");
  var title= document.createElement("h4");
  var address= document.createElement("p");
  address.textContent = this.address;
  title.textContent = this.restaurantName;
  container.appendChild(title);
  container.appendChild(this.star.node);
  container.appendChild(address);
  this.node = container;
}

Restaurant.prototype.onSelected = function() {
  console.log("Restaurant : "+this.restaurantName+" selected");
  //displayRestaurantDesc();
},



Restaurant.prototype.getRatingAverage = function() {
  var total=0;
  var nb=0;
  this.ratings.forEach(function(e){
    nb++;
    total += e.stars;
  });
  if(nb===0) return undefined;
  return (total/nb);
  //displayRestaurantDesc();
},

Restaurant.prototype.appendsRatings = function() {

  this.ratings.forEach(function(rating){
    var stars = document.createElement("div");
    var comment = document.createElement("p");
    stars.textContent = rating.stars;
    comment.textContent = rating.comment;
    var rate = document.createElement()
  });
  this.node.appendChild();
},

Restaurant.prototype.displayRestaurantDesc = function(){
  var p= document.createElement("p");
  p.textContent = this.restaurantName;
  var list = document.getElementById('restaurant-list');
  list.textContent ="1234567";
}

Restaurant.prototype.isVisible = function () {

};
