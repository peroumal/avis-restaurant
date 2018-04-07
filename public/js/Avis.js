function Star(){
  this.stars = [];
  this.node = document.createElement("a");
  for(var i=0;i<5;i++){
    var img = document.createElement("img");
    img.setAttribute("src","assets/pic/star-empty.svg");
    img.classList = "star";
    this.stars.push(img);
    this.node.appendChild(img);
  }
};

Star.prototype.setValue = function (value) {
  var pos=0;
  this.stars.forEach(function(star){
    var status="empty";
    if(pos++ < value) status = "filled";
    star.setAttribute("src","assets/pic/star-"+status+".svg");
  });
};
