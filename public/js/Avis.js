function Star(value){
  this.node = document.createElement("a");
  for(var i=0;i<5;i++){
    var img = document.createElement("img");
    img.setAttribute("src","assets/pic/star.png");
    img.classList = "star";
    this.node.appendChild(img);

  }
}
