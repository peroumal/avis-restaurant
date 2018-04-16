
class Star{

  constructor(checked,size){
    this.stars = [];
    this.value=0;
    this.onUpdate=null;
    this.checked = checked;
    this.node = document.createElement("a");
    this.node.style.width = "auto";
    for(var i=0;i<5;i++){
      var img = document.createElement("img");
      img.classList = "star";
      this.stars.push(img);
      if(size) {
        img.style.height=size;
        img.style.width = size;
      }
      this.node.appendChild(img);
      if (this.checked=="selected") this.listenSelectionEvent(img)
    }
  }

  enableDescriptions(node, descriptions){
    this.hasDescription= true;
    this.descriptionNode = node;
    this.descriptions = descriptions;
  }

  listenSelectionEvent(img) {
    var context = this;
    img.addEventListener("mouseenter",function(e){
      var pos = context.stars.indexOf(img)+1;
      for (var i=0;i<pos;i++) context.stars[i].setAttribute("src","assets/pic/star-onselected.svg");
      for (var j=pos;j<context.stars.length;j++) context.stars[j].setAttribute("src","assets/pic/star-unselected.svg");
      if(context.value == pos) context.check(pos);
      if(context.hasDescription) context.descriptionNode.textContent = context.descriptions[pos];
      context.onChange();
    });
    img.addEventListener("mouseout",function(e){
        if(e.relatedTarget.classList == "star") console.log("continue");
        else context.setValue(context.value);
        context.onChange();
    });
    img.addEventListener("click",function(e){
      var pos = context.stars.indexOf(img)+1;
      context.setValue(pos);
    });
  }

  onChange(){

  }

  setValue (value) {
    var hasChanged = (value != this.value);
    this.check(value);
    if(this.hasDescription) this.descriptionNode.textContent = this.descriptions[value];
    if(hasChanged && this.onUpdate!=undefined && this.onUpdate!=null) this.onUpdate(value);
  }

  check(value){
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
