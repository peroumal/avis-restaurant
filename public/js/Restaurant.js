
function Restaurant(restaurant){
  if(restaurant.id) this.id = restaurant.id;
  this.lat = restaurant.lat;
  if(restaurant.rating) this.rating = Math.round(restaurant.rating);
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
  var resto = this;
  container.addEventListener("click",function(){
    goToRestaurant(resto);
  });
  container.classList = "restaurant";
  var title= document.createElement("h5");

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
  photo.setAttribute("src",getPhotoUrlAt(this.lat,this.long));
  photo.setAttribute("title",this.restaurantName);
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
  if(this.ratings && this.ratings != []){
    this.ratings.forEach(function(rate){
      container.appendChild(restaurant.createRatingNode(rate.stars,rate.comment));
    });
  }


  if(this.id && this.ratings && this.ratings.length<1) {
    console.log("results:reviews","clled");
    var resto = this;
    getDetailFrom(this.id,function(data){
      var stringifyed = JSON.stringify(data);
      var parsed = JSON.parse(stringifyed);
      for(var i=0; i<parsed.reviews.length ;i++){
        var stars = parsed.reviews[i].rating;
        var comment = parsed.reviews[i].text;
        container.appendChild(resto.createRatingNode(stars,comment));
        resto.ratings.push({stars:stars,comment:comment});
      }
  });
}
  return container;
},

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

  var comment = insertInputField(body,"Donnez un avis (facultatif)","mon super commentaire");
  if(this.rated) comment.value = this.ratings[0].comment;

  var context = this;
  var submit = document.getElementById("modal-submit");
  submit.classList = "btn btn-secondary";
  submit.textContent = "Annuler";
  submit.onclick = function(){
    if(minStar.value>0) {
      var elem = {stars:minStar.value,comment:comment.value};
      if (context.rated) context.ratings[0] = elem;
      else context.ratings.unshift(elem);
      context.rated = true;
      context.refresh(context);
    }
  };
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
  if(nb===0) return this.rating;
  this.rating = Math.round(total/nb);
  return this.rating;
},

Restaurant.prototype.isVisible = function () {

};
