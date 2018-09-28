function Segment(){
  this.segrad = 10;
  this.loc = new JSVector();
}
function Snake(segment){
  this.seglist = [];
  this.segdist = segment.segrad*2;
  this.segnum = 6;
  this.segment = segment;
  var seg0 = new Segment();
  this.seglist.push(seg0);
  for (var i = 1; i < this.segnum; i++) {
    var temp = new Segment();
    temp.loc.x = this.seglist[i-1].segrad*2;
    temp.loc.y = this.seglist[i-1].segrad*2;
    this.seglist.push(temp);
  }
}
Snake.prototype.run = function(){
  this.update();
  this.render();
}
Snake.prototype.render = function(){
  for(var i=0;i<=this.segnum;i++){
    ctx.strokeStyle = 'rgba(55,50,220)';
    ctx.fillStyle = "rgba(100,162,120)";
    ctx.beginPath();
    ctx.arc(this.seglist[i].loc.x,this.seglist[i].loc.y, segment.segrad, 0, Math.PI*2, false);
    ctx.stroke();
    ctx.fill();
  }
}
Snake.prototype.update = function(){
  console.log(this.seglist[0].loc);
  this.move(boid.loc,this.seglist[0].loc);
  for (var i=1;i<this.segnum;i++){
    this.move(this.seglist[i-1],this.seglist[i]);
  }
}

Snake.prototype.move = function(targetloc, moverloc){
  var temp = JSVector.subGetNew(targetloc.loc,moverloc.loc);
  temp = temp.add(targetloc.loc);
  temp.JSVector.setMagnitude(this.segdist);
  moverloc.loc = temp;
  // var temp = JSVector.subGetNew(boid.loc,seglist[0].loc);
  // temp = JSVector.add(temp,boid.loc);
  // seglist[0].loc = temp;
}
