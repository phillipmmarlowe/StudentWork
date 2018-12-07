
function Boid(){
  this.orbiter = new Orbiter(this);
  this.loc = new JSVector(Math.random()*canvas.width,Math.random()*canvas.height);
  this.vel = new JSVector(2,2);
  this.acc = new JSVector();
  this.rad = 20;
}

function Orbiter(boid){
  this.rad = 10;
  this.distance = new JSVector(100,0);
  this.vel = 0.2;
  this.boid = boid;
  var red = Math.random()*128+128;
  var green = Math.random()*128+128;
  var blue = Math.random()*128+128;
  this.color = "rgb("+red+","+green+","+blue+")";
}

Orbiter.prototype.run = function(){
  this.update();
  this.render();
}

Orbiter.prototype.update = function(){
  this.distance.rotate(this.vel);

}

Orbiter.prototype.render = function(){
  var loc = JSVector.addGetNew(this.boid.loc,this.distance);
  ctx.strokeStyle = this.color;
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(loc.x ,loc.y ,this.rad ,0 ,Math.PI*2 ,false);
  ctx.stroke();
  ctx.fill();
}

Boid.prototype.run = function(){
  this.checkEdges();
  this.orbiter.run();
  this.update();
  this.render();
}

Boid.prototype.update = function(){
  this.loc.x += this.vel.x;
  this.loc.y += this.vel.y;
}

Boid.prototype.render = function(){
  ctx.strokeStyle = this.color;
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.loc.x,this.loc.y, this.rad, 0, Math.PI*2, false);
  ctx.stroke();
  ctx.fill();
}

Boid.prototype.checkEdges = function(){
  if(this.loc.x > canvas.width || this.loc.x < 0)  this.vel.x = -this.vel.x;
  if(this.loc.y > canvas.height || this.loc.y < 0)  this.vel.y = -this.vel.y;
}
Orbiter.prototype.seperation = function(){
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

Orbiter.prototype.cohesion = function(){
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

Orbiter.prototype.alignment = function(){
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
Orbiter.prototype.applyForce = function(force){
  this.acc.add(force);
}
