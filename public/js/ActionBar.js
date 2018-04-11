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
      ActionBar.get("icon").addEventListener("click",function _func(e){
          if(back!=undefined && back!=null) back();
          e.target.setAttribute("src","assets/pic/search.svg");
          e.target.removeEventListener("click",_func);
      });
    }
  },
  hideNavigation:function(){
    
  }
};
