function Segment(){
  //this.segrad = 10;
  this.loc = new JSVector();
}
function Snake(radius, boid){
  this.seglist = [];
  var red = Math.random()*128+128;
  var green = Math.random()*128+128;
  var blue = Math.random()*128+128;
  this.color = "rgb("+red+","+green+","+blue+")";
  boid.color = this.color;
  this.segdist = radius*2;
  this.boiddist = 100;
  this.radius = radius;
  this.boid = boid;
  this.segnum = 6;
  //this.segment = segment;
  var seg0 = new Segment();
  this.seglist.push(seg0);
  for (var i = 1; i < this.segnum; i++) {
    var temp = new Segment();
    temp.loc.x = this.seglist[i-1].loc.x+radius*2;
    temp.loc.y = this.seglist[i-1].loc.y+radius*2;
    this.seglist.push(temp);
  }
}
Snake.prototype.run = function(){
  this.update();
  this.render();
}
Snake.prototype.render = function(){
  for(var i=0;i<this.segnum;i++){
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.seglist[i].loc.x,this.seglist[i].loc.y,this.radius, 0, Math.PI*2, false);
    ctx.stroke();
    ctx.fill();
  }
}
Snake.prototype.update = function(){
  this.boid.run();
  this.move(this.boid,this.seglist[0], this.boiddist);
  for (var i=1;i<this.segnum;i++){
    this.move(this.seglist[i-1],this.seglist[i],this.segdist);
  }
}

Snake.prototype.move = function(targetloc, moverloc, distance){
  var temp = JSVector.subGetNew(moverloc.loc,targetloc.loc);
  temp.setMagnitude(distance);
  temp = temp.add(targetloc.loc);
  moverloc.loc = temp;
  // var temp = JSVector.subGetNew(boid.loc,seglist[0].loc);
  // temp = JSVector.add(temp,boid.loc);
  // seglist[0].loc = temp;
}
