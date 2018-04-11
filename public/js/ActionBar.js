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
      this.get("icon").onclick = this.hideNavigation;
    if(title != null && back!=null){
      this.get("title").textContent = title;
      this.get("icon").setAttribute("src","assets/pic/back.svg");
      this.get("icon").onclick = back;
    }
  },
hideNavigation:function(e){
  if(ActionBar.title==null){
    ActionBar.get("icon").style.float = "right";
    var node = ActionBar.get("bar").parentNode;
    node.style.left = (40-getDimensions(node)[1])+"px";
    e.target.setAttribute("src","assets/pic/search.svg");
    document.getElementById("map").style.left = "40px";
    document.getElementById("map").style.width = (window.innerWidth)+"px";
  }
}
};
