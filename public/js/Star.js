
function Star(editable){
  this.stars = [];
  this.node = document.createElement("a");
  for(var i=0;i<5;i++){
    var img = document.createElement("img");
    this.editable = editable;
    img.classList = "star";
    this.stars.push(img);
    this.node.appendChild(img);
  }
};

Star.prototype.refreshDrawable = function () {
    this.checked = "empty";
    if(this.editable){
        this.checked = "unselected";
        console.log("is unselected");
    }
}

Star.prototype.setValue = function (value) {
  var pos=0;

  this.refreshDrawable();
  console.log("onSetStar:"+value+"checked="+this.checked);
  this.stars.forEach(function(star){
    var status = this.checked;
    if(pos++ < value) status = "filled";
    star.setAttribute("src","assets/pic/star-"+status+".svg");
  });
};
