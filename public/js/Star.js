
function Star(editable){
  this.stars = [];
  this.node = document.createElement("a");
  for(var i=0;i<5;i++){
    var img = document.createElement("img");
    this.editable = editable;
    if(this.editable) img.setAttribute("src","assets/pic/star-unselected.svg");
    else img.setAttribute("src","assets/pic/star-empty.svg");
    img.classList = "star";
    this.stars.push(img);
    this.node.appendChild(img);
  }
};

Star.prototype.setValue = function (value) {
  var pos=0;
  console.log("onSetStar:"+this.editable);
  this.stars.forEach(function(star){
    var status = ((this.editable)?"unselected":"emptys");
    if(pos++ < value) status = ((this.editable)?"selected":"filled");
    star.setAttribute("src","assets/pic/star-"+status+".svg");
  });
};
