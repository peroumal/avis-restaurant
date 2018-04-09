
function Star(checked){
  this.stars = [];
  this.checked = checked;
  this.node = document.createElement("a");
  for(var i=0;i<5;i++){
    var img = document.createElement("img");
    img.classList = "star";
    this.stars.push(img);
    this.node.appendChild(img);
  }
};

Star.prototype.setValue = function (value) {
  var pos=0;
  console.log("onSetStar:"+value+"checked="+this.checked);
  var status = this.checked;
  this.stars.forEach(function(star){
    var name = status;
    if(++pos > value) name = "un"+status;
    star.setAttribute("src","assets/pic/star-"+name+".svg");
  });
};
