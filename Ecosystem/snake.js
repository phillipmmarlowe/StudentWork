function Segment(){
  //this.segrad = 10;
  this.loc = new JSVector();
}
function Segment0(){
  //this.segrad = 10;
  this.loc = new JSVector();
  this.vel = new JSVector(Math.random()*5,Math.random()*5);
  this.acc = new JSVector();
}
function Snake(radius){
  this.seglist = [];
  var red = Math.random()*128+128;
  var green = Math.random()*128+128;
  var blue = Math.random()*128+128;
  this.color = "rgb("+red+","+green+","+blue+")";
  this.segdist = radius*2;
  this.radius = radius;
  this.segnum = 6;
  //this.segment = segment;
  var seg0 = new Segment0();
  this.seglist.push(seg0);
  for (var i = 1; i < this.segnum; i++) {
    var temp = new Segment();
    temp.loc.x = this.seglist[i-1].loc.x+radius*2;
    temp.loc.y = this.seglist[i-1].loc.y+radius*2;
    this.seglist.push(temp);
  }
}
Snake.prototype.run = function(){
  this.checkEdges();
  this.update();
  this.render();
}

Snake.prototype.render = function(){
  for(var i=0;i<this.seglist.length;i++){
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.seglist[i].loc.x,this.seglist[i].loc.y,this.radius-i, 0, Math.PI*2, false);
    ctx.stroke();
    ctx.fill();
}
}

Snake.prototype.checkEdges = function(){
  if(this.seglist[0].loc.x > window.innerWidth || this.seglist[0].loc.x < 0)  this.seglist[0].vel.x = -this.seglist[0].vel.x;
  if(this.seglist[0].loc.y > window.innerHeight || this.seglist[0].loc.y < 0)  this.seglist[0].vel.y = -this.seglist[0].vel.y;
}


Snake.prototype.update = function(){
  this.seglist[0].vel.x+=this.seglist[0].acc.x;
  this.seglist[0].vel.y+=this.seglist[0].acc.y;
  this.seglist[0].loc.x+=this.seglist[0].vel.x;
  this.seglist[0].loc.y+=this.seglist[0].vel.y;
  for (var i=1;i<this.seglist.length;i++){
    this.move(this.seglist[i-1],this.seglist[i],this.segdist-i);
  }
}

Snake.prototype.move = function(targetloc, moverloc, distance){
  var temp = JSVector.subGetNew(moverloc.loc,targetloc.loc);
  temp.setMagnitude(distance);
  temp = temp.add(targetloc.loc);
  moverloc.loc = temp;
}
