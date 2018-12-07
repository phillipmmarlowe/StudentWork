function Segment(){
  //this.segrad = 10;
  this.loc = new JSVector();
}
function Segment0(){
  //this.segrad = 10;
  this.loc = new JSVector();
  this.vel = new JSVector(2,2);
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
    ctx.arc(this.seglist[i].loc.x,this.seglist[i].loc.y,this.radius, 0, Math.PI*2, false);
    ctx.stroke();
    ctx.fill();
}
}

Snake.prototype.checkEdges = function(){
  if(this.seglist[0].loc.x > window.innerWidth || this.seglist[0].loc.x < 0)  this.seglist[0].vel.x = -this.seglist[0].vel.x;
  if(this.seglist[0].loc.y > window.innerHeight || this.seglist[0].loc.y < 0)  this.seglist[0].vel.y = -this.seglist[0].vel.y;
}


Snake.prototype.update = function(){
  this.seglist[0].loc.x+=this.seglist[0].vel.x;
  this.seglist[0].loc.y+=this.seglist[0].vel.y;
  for (var i=1;i<this.seglist.length;i++){
    this.move(this.seglist[i-1],this.seglist[i],this.segdist);
  }
}

Snake.prototype.move = function(targetloc, moverloc, distance){
  var temp = JSVector.subGetNew(moverloc.loc,targetloc.loc);
  temp.setMagnitude(distance);
  temp = temp.add(targetloc.loc);
  moverloc.loc = temp;
}

Snake.prototype.seperation = function(){
  var sum = new JSVector();
  for(var i=0;i<vehicles.length;i++){
    var v = vehicles[i];
    if(v==this){
      continue;
    }
    if(this.loc.distance(v.loc)<seperationradius){
      var desired = JSVector.subGetNew(this.loc,v.loc);
      desired.setMagnitude(maxspeed);
      sum.add(desired);
    }
  }
  if(sum.getMagnitude()>0){
    sum.setMagnitude(maxspeed);
    var steering = JSVector.subGetNew(sum,this.vel);
    steering.limit(maxsteeringsep);
    this.applyForce(steering);
  }

}

Snake.prototype.cohesion = function(){
  var sum = new JSVector();
  var count = 0;
  for(var i=0;i<vehicles.length;i++){
    var v = vehicles[i];
    if(v==this){
      continue;
    }
    if(this.loc.distance(v.loc)<cohesionradius){
      sum.add(v.loc);
      count++;
    }
  }
  if(sum.getMagnitude()>0){
  sum.divide(count);
  var desired = JSVector.subGetNew(sum,this.loc);
  var steering = JSVector.subGetNew(desired,this.vel);
  steering.limit(maxsteeringcoh);
  this.applyForce(steering);
  } else {
    var steering = new JSVector();
    this.applyForce(steering);
  }
}

Snake.prototype.alignment = function(){
  var sum = new JSVector();
  var count = 0;
  for(var i=0;i<vehicles.length;i++){
    var v = vehicles[i];
    if(v==this){
      continue;
    }
    if(this.loc.distance(v.loc)<alignmentradius){
      sum.add(v.vel);
      count++;
    }
  }
  if(count>0){
    var desired = sum.divide(count);
    desired.setMagnitude(maxspeed);
    var steering = JSVector.subGetNew(desired,this.vel);
    steering.setMagnitude(maxsteeringalign);
    this.applyForce(steering);
  }
}
Snake.prototype.applyForce = function(force){
  this.acc.add(force);
}
