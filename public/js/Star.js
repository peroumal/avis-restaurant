
class Star{

  constructor(checked){
    this.stars = [];
    this.value=0;
    this.onUpdate=null;
    this.checked = checked;
    this.node = document.createElement("a");
    for(var i=0;i<5;i++){
      var img = document.createElement("img");
      img.classList = "star";
      this.stars.push(img);
      this.node.appendChild(img);
      if (this.checked=="selected") this.onSelected(img)
    }
  }

  onSelected(img) {
    var pos = this.stars.indexOf(img)+1;
    var context = this;

    img.addEventListener("mouseenter",function(e){
      for (var i=0;i<pos;i++) context.stars[i].setAttribute("src","assets/pic/star-onselected.svg");
      for (var j=pos;j<context.stars.length;j++) context.stars[j].setAttribute("src","assets/pic/star-unselected.svg");
    });

    img.addEventListener("mouseout",function(e){
        if(e.relatedTarget.classList == "star") console.log("continue");
        else context.setValue(context.value);
    });

    img.addEventListener("click",function(e){
      context.setValue(pos);
    });
  }

  setValue (value) {
    var pos=0;
    this.value = value;
    console.log("onSetStar:"+value+"checked="+this.checked);
    var status = this.checked;
    this.stars.forEach(function(star){
      var name = status;
      if(++pos > value) name = "un"+status;
      star.setAttribute("src","assets/pic/star-"+name+".svg");
    });
    if(this.onUpdate!=undefined && this.onUpdate!=null) this.onUpdate();
  }
}
