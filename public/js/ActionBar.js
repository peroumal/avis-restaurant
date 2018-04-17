
var ActionBar = {
  isExpanded:true,
  HOME:null,
  title:null,
  get: function(name){
    return document.getElementById("action-"+name);
  },
  set: function(title,back){
      this.title = title;
      this.back = back;
      this.get("title").textContent = "";
      this.get("title").style.lineHeight = "";
      insertInputField(this.get("title"),"trouver un restaurant","Ma recherche").addEventListener("input",this.onSearch);
      this.get("icon").setAttribute("src","assets/pic/back.svg");
      this.get("icon").onclick=this.onDisplayNavigation;
    if(title != null && back!=null){
      this.show();
      this.get("title").textContent = title;
      this.get("title").style.lineHeight = "40px";
      this.get("icon").setAttribute("src","assets/pic/back.svg");
      this.get("icon").onclick = back;
    }
  },

  onSearch: function(e){
    var text = e.target.value;
    console.log("search:"+text);
    if(e.target.value.length<=0) showRestaurants();
    var list = document.getElementById('results');
    var service = new google.maps.places.AutocompleteService(null,{});

    service.getPlacePredictions({input: text,  componentRestrictions: {country: country}}, function(predictions,status){

        list.textContent = "";
        //var values = JSON.parse(predictions);
        predictions.forEach(function(value){
          var desc = value.description;
          var id = value.place_id;
          console.log("search-place-id:",id);
          list.appendChild(ActionBar.createResultNode(desc,id));
        });
    });

  },



  createResultNode: function(description,id) {
    var container= document.createElement("h4");
    container.setAttribute("id",id);
    container.addEventListener("click",function(e){
      var targetid = e.target.getAttribute("id");
      console.log("result:target:id:",targetid);

      getDetailFrom(targetid,function(data){
        var stringifyed = JSON.stringify(data);
        var parsed = JSON.parse(stringifyed);
        var restaurant = newRestaurantFromDetail(parsed);
        console.log("restaurant:details",restaurant);
          markers.push(createRestaurantMarker(restaurant));
        goToRestaurant(restaurant);
      });
    });

    container.classList = "restaurant";
    container.textContent = description;
    return container;

  },

  onDisplayNavigation:function(e){
    if(ActionBar.isExpanded)
       ActionBar.hide();
    else ActionBar.show();
    ActionBar.isExpanded=!ActionBar.isExpanded;
  },

  hide:function(){
  ActionBar.get("icon").style.float = "right";
  var node = ActionBar.get("bar").parentNode;
  node.style.left = (40-getDimensions(node)[1])+"px";
  //ActionBar.get("icon").setAttribute("src","assets/pic/search.svg");
  showMapFrom(40);
},

  show:function(){
  var node = ActionBar.get("bar").parentNode;
  ActionBar.get("icon").style.float = "left";
  node.style.left = "0px";
  setAdaptativeDimensions();
  //ActionBar.get("icon").setAttribute("src","assets/pic/search.svg");
},

};
