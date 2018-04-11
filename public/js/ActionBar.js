var ActionBar = {
  isExpanded:true,
  HOME:null,
  title:null,
  get: function(name){
    return document.getElementById("action-"+name);
  },
  set: function(title,back){
      if(title) this.title = title;
      this.back = ActionBar.HOME;
      this.get("title").textContent = "Liste des restaurants";
      this.get("icon").setAttribute("src","assets/pic/back.svg");
    if(title != null){
      this.get("title").textContent = title;
      this.get("icon").setAttribute("src","assets/pic/back.svg");
      this.get("icon").addEventListener("click",back);
    }else {
      this.get("icon").addEventListener("click",this.hideNavigation);
    }
  },
hideNavigation:function(e){
  if(ActionBar.title==null){
    var node = ActionBar.get("bar").parentNode;
    node.style.left = (0-getDimensions(node)[1])+"px";
    e.target.setAttribute("src","assets/pic/search.svg");
    e.target.removeEventListener("click",this);
  }
}
};
