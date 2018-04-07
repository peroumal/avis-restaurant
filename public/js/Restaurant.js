function Restaurant(restaurant){
  this.lat = restaurant.lat;
  this.long = restaurant.long;
  this.address = restaurant.address;
  this.ratings = restaurant.ratings;
  this.star = new Star();
  this.restaurantName = restaurant.restaurantName;
  this.position = {lat: restaurant.lat, lng: restaurant.long};
  this.marker = null;
  this.createNode();
};


Restaurant.prototype.createNode = function() {
  var container= document.createElement("div");

  var title= document.createElement("h4");
  title.textContent = this.restaurantName;
  container.appendChild(title);

  this.star.setValue(this.getRatingAverage());
  container.appendChild(this.star.node);

  container.appendChild(this.createAddressNode());

  this.node = container;
  return this.node;
},

Restaurant.prototype.createRatingNode = function(name, value, comment) {
  var container= document.createElement("div");

  var nameNode= document.createElement("b");
  nameNode.textContent = name;
  container.appendChild(nameNode);

  var star = new Star();
  star.setValue(value);
  container.appendChild(star.node);

  var commentNode= document.createElement("p");
  commentNode.textContent = comment;
  container.appendChild(commentNode);

  return container;
},

Restaurant.prototype.createStreetViewNode = function(){
  var container= document.createElement("div");

  var photo = document.createElement("img");
  photo.style.marginLeft="-20px";
  photo.style.marginTop="-20px";
  photo.setAttribute("src",getPhotoUrlAt(this.lat,this.long));
  photo.setAttribute("alt",this.address);
  photo.setAttribute("title",this.restaurantName);
  container.appendChild(photo);
  container.appendChild(this.createAddressNode());
  return container;
},

Restaurant.prototype.createAddressNode = function () {
  var address= document.createElement("p");
  address.textContent = this.address;
  return address;
},

Restaurant.prototype.createInfoNode = function(){
  var container= document.createElement("div");
  container.appendChild(this.createStreetViewNode());
  container.appendChild(this.createTitleNode("Avis"));
  this.ratings.forEach(function(rate){
    var name = rate.name;
    if (name == undefined || name== null) name="Anonyme";
    container.appendChild(restaurant.createRatingNode(name,rate.stars,rate.comment));
  });
  return container;
}

Restaurant.prototype.createTitleNode = function (name) {
  var titleNode = document.createElement("h3");
  titleNode.textContent=name;
  return titleNode;
};



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
},

Restaurant.prototype.isVisible = function () {

};
