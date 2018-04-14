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
      insertInputField(this.get("title"),"trouver un restaurant","Ma recherche");
      this.get("icon").setAttribute("src","assets/pic/back.svg");
      this.get("icon").onclick=this.hide;
    if(title != null && back!=null){
      this.show();
      this.get("title").textContent = title;
      this.get("icon").setAttribute("src","assets/pic/back.svg");
      this.get("icon").onclick = back;
    }
  },

hide:function(e){
  ActionBar.get("icon").onclick = ActionBar.show;
  if(ActionBar.get("icon").style.float == "right"){
     ActionBar.show();
     return;
  }
  ActionBar.get("icon").style.float = "right";
  var node = ActionBar.get("bar").parentNode;
  node.style.left = (40-getDimensions(node)[1])+"px";
  //ActionBar.get("icon").setAttribute("src","assets/pic/search.svg");
  showMapFrom(40);
},

show:function(e){
  var node = ActionBar.get("bar").parentNode;
  ActionBar.get("icon").style.float = "left";
  node.style.left = "0px";
  setAdaptativeDimensions();
  //ActionBar.get("icon").setAttribute("src","assets/pic/search.svg");
  ActionBar.get("icon").onclick = ActionBar.hide;
}
};
