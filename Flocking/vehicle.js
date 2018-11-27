var maxspeed = 2;
var maxsteeringsep = .3;
var seperationradius = 30;
var maxsteeringco = .1;
var cohesionradius = 31;
var maxsteeringalign = .0003;
var alignmentradius = 10;
function Vehicle(loc, vel, acc, base, height){
  this.loc = loc;
  this.vel = vel;
  this.acc = acc;
  this.height = height;
  this.base = base;
  this.lifespan = 0;
}

Vehicle.prototype.render = function(){
  ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  ctx.save();
  ctx.translate(this.loc.x,this.loc.y);
  ctx.rotate(this.vel.getDirection());
  ctx.beginPath();
  ctx.moveTo(0-this.height/2,0-this.base/2);
  ctx.lineTo(this.height/2,0);
  ctx.lineTo(0-this.height/2,this.base/2);
  //ctx.moveTo(-10,-10);
  //ctx.lineTo(10,0);
  //ctx.lineTo(-10,10);
  //ctx.arc(this.loc.x,this.loc.y, this.rad, Math.PI*2, 0, false);
  ctx.fill();
  ctx.restore();
}
Vehicle.prototype.update = function(){
  this.seperation();
  this.cohesion();
  if(this.lifespan>300){
  this.alignment();
  }
  this.vel.x += this.acc.x;
  this.vel.y += this.acc.y;
  this.vel.limit(maxspeed);
  this.loc.x += this.vel.x;
  this.loc.y += this.vel.y;
  // this.acc.x = Math.random()*2-1;
  // this.acc.y = Math.random()*2-1;
  this.acc.multiply(0);
  this.lifespan += 1;
  this.render();
}
Vehicle.prototype.run = function(){
  this.checkEdges();
  this.update();
}
Vehicle.prototype.checkEdges = function(){
  if(this.loc.x > canvas.width)  this.loc.x = 0;
  if(this.loc.x < 0) this.loc.x = canvas.width;
  if(this.loc.y > canvas.height)  this.loc.y = 0;
  if(this.loc.y < 0) this.loc.y = canvas.height;
}

Vehicle.prototype.seperation = function(){
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

Vehicle.prototype.cohesion = function(){
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
  var desired = JSVector.subGetNew(v.loc,this.loc);
  var steering = JSVector.subGetNew(desired,this.vel);
  steering.limit(maxsteeringco);
  this.applyForce(steering);
  } else {
    var steering = new JSVector();
    this.applyForce(steering);
  }
}

Vehicle.prototype.alignment = function(){
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
    sum.divide(count);
    sum.normalize();
    sum.setMagnitude(maxsteeringalign);
    var steering = JSVector.subGetNew(this.vel,sum);
    steering.normalize();
    steering.limit(maxspeed);
    this.applyForce(steering);
}
}

Vehicle.prototype.applyForce = function(force){
  this.acc.add(force);
}
