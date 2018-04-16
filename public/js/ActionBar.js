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
      insertInputField(this.get("title"),"trouver un restaurant","Ma recherche").addEventListener("input",this.onSearch);
      this.get("icon").setAttribute("src","assets/pic/back.svg");
      this.get("icon").onclick=this.onDisplayNavigation;
    if(title != null && back!=null){
      this.show();
      this.get("title").textContent = title;
      this.get("icon").setAttribute("src","assets/pic/back.svg");
      this.get("icon").onclick = back;
    }
  },

  onSearch: function(e){
    var input = e.target;
    var options = {
      bounds: map.getBounds(),
      types: ['restaurant']
    };
    var autocomplete = new google.maps.places.SearchBox(input, options);
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
}
};
