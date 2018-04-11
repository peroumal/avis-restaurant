
function Restaurant(restaurant){
  this.lat = restaurant.lat;
  this.long = restaurant.long;
  this.address = restaurant.address;
  this.refresh = null;
  this.rated = false;
  this.ratings = restaurant.ratings;
  this.myRating = undefined;
  this.star = new Star("filled");
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

Restaurant.prototype.createRatingNode = function(value, comment) {
  var container= document.createElement("div");
  container.classList="rate";
  var star = new Star("filled");
  star.setValue(value);
  star.node.style.paddingTop ="30px";

  container.appendChild(star.node);
  var commentNode= document.createElement("p");
  commentNode.textContent = comment;
  container.appendChild(commentNode);

  return container;
},

Restaurant.prototype.createStreetViewNode = function(){
  var container= document.createElement("div");
  var photo = document.createElement("img");
  photo.style.marginLeft="-10px";
  photo.setAttribute("src",getPhotoUrlAt(this.lat,this.long));
  photo.setAttribute("alt",this.address);
  photo.setAttribute("title",this.restaurantName);
  container.appendChild(this.createAddressNode());
  container.appendChild(photo);
  return container;
},

Restaurant.prototype.createAddressNode = function () {
  var address= document.createElement("p");
  address.textContent = this.address;
  return address;
},

Restaurant.prototype.createInfoNode = function(){
  var container= document.createElement("div");
  container.appendChild(this.createTitleNode("Avis"));
  this.ratings.forEach(function(rate){
    container.appendChild(restaurant.createRatingNode(rate.stars,rate.comment));
  });
  return container;
}

Restaurant.prototype.createTitleNode = function (name) {
  var container= document.createElement("div");
  var titleNode = document.createElement("h3");
  titleNode.textContent=name;
  var button = document.createElement("button");
  button.id = "add-rating";

  if(this.rated) button.textContent = "Modifier mon avis";
  else button.textContent = "Ajouter un avis";

  button.setAttribute("data-toggle","modal");
  button.setAttribute("data-target","#exampleModal");
  button.classList.add("btn");
  button.classList.add("btn-primary");
  var context = this;
  container.appendChild(titleNode);
  container.appendChild(button);
  button.addEventListener('click',function(e){
    context.putRatingDialog();
  });
  return container;
};

Restaurant.prototype.putRatingDialog = function(){
  var body = document.getElementById("modal-body");
  body.textContent ="";

  var minStar = new Star("selected","48px");
  minStar.enableDescriptions(document.getElementById("exampleModalLabel"),["aucun avis","horrible","bof","correct","très bien","parfait"]);
  minStar.onUpdate = this.setRating;
  if(this.rated) minStar.setValue(this.ratings[0].stars);
  else    minStar.setValue(0);
  body.appendChild(minStar.node);

  var comment = document.createElement("input");
  comment.style.display ="block";
  comment.setAttribute("type","textarea");
  if(this.rated) comment.value = this.ratings[0].comment;
  comment.classList = "comment";
  comment.setAttribute("placeholder","Tapez cotre commentaire ici");
  body.appendChild(comment);

  var context = this;
  var submit = document.getElementById("modal-submit");
  submit.addEventListener("click", function(){

    if(minStar.value>0) {
      var elem = {stars:minStar.value,comment:comment.value};
      if (context.rated) context.ratings[0] = elem;
      else context.ratings.unshift(elem);
      context.rated = true;
      context.refresh(context);
    }
  });
},

Restaurant.prototype.setRating = function(value){
  var submit = document.getElementById("modal-submit");
  if(value>0){
    submit.classList = "btn btn-primary";
    submit.textContent = "Confirmer l'avis";
  }
},

Restaurant.prototype.onSelected = function() {
  console.log("Restaurant : "+this.restaurantName+" selected");
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

Restaurant.prototype.isVisible = function () {

};
