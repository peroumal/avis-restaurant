
class Star{

  constructor(checked){
    this.stars = [];
    this.value=0;
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
    var pos = this.stars.indexOf(img);
    var context = this;

    img.addEventListener("mouseover",function(e){
      for (var i=0;i<=pos;i++) context.stars[i].setAttribute("src","assets/pic/star-onselected.svg");
      for (var j=pos+1;j<context.stars.length;j++) context.stars[j].setAttribute("src","assets/pic/star-unselected.svg");
    });

    img.addEventListener("mouseout",function(e){
        if(e.relatedTarget.classList == "star") console.log("continue");
        else context.setValue(context.value);
    });

    img.addEventListener("click",function(e){
      for (var i=0;i<=pos;i++) context.stars[i].setAttribute("src","assets/pic/star-selected.svg");

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
  }
}
