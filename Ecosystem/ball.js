

function Ball(loc, vel, rad, acc){
  this.loc = loc;
  this.vel = vel;
  this.acc = acc;
  this.rad = rad;
  var red = Math.random()*128+128;
  var green = Math.random()*128+128;
  var blue = Math.random()*128+128;
  this.color = "rgb("+red+","+green+","+blue+")";

}

Ball.prototype.run = function(){
  this.checkEdges();
  this.update();
}

Ball.prototype.checkEdges = function(){
  if(this.loc.x > window.innerWidth || this.loc.x < 0)  this.vel.x = -this.vel.x;
  if(this.loc.y > window.innerHeight || this.loc.y < 0)  this.vel.y = -this.vel.y;
}

Ball.prototype.update = function(){
  //this.seperation();
  //this.cohesion();
  //this.alignment();
  this.vel.x += this.acc.x;
  this.vel.y += this.acc.x;
  this.loc.x += this.vel.x;
  this.loc.y += this.vel.y;
  this.render();
}

Ball.prototype.render = function(){
  ctx.strokeStyle = this.color;
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.loc.x,this.loc.y, this.rad, Math.PI*2, 0, false);
  ctx.stroke();
  ctx.fill();
}

Ball.prototype.seperation = function(){
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

Ball.prototype.cohesion = function(){
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

Ball.prototype.alignment = function(){
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
Ball.prototype.applyForce = function(force){
  this.acc.add(force);
}
