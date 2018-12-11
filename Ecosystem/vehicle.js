var maxspeed = 2;
var maxsteeringsep = .4;
var seperationradius = 50;
var maxsteeringcoh = .3;
var cohesionradius = 100;
var maxsteeringalign = .1;
var alignmentradius = 100;
function Vehicle(loc, vel, acc, base, height){
  this.loc = loc;
  this.vel = vel;
  this.acc = acc;
  this.height = height;
  this.base = base;
  var red = Math.random()*128+128;
  var green = Math.random()*128+128;
  var blue = Math.random()*128+128;
  this.color = "rgb("+red+","+green+","+blue+")";
  //this.lifespan = 0;
}

Vehicle.prototype.render = function(){
  ctx.strokeStyle = this.color;
  ctx.fillStyle = this.color;
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
  this.seperationSnake();
  this.cohesion();
  this.alignment();
  //if(this.lifespan>300){
  //this.acc.limit(.1);
  this.vel.x += this.acc.x;
  this.vel.y += this.acc.y;
  //this.vel.limit(maxspeed);
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
  for(var i=0;i<eco.vehicles.length;i++){
    var v = eco.vehicles[i];
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

  //Seperate from Snakes
Vehicle.prototype.seperationSnake = function(){
  var sumSnake = new JSVector();
  for(var i=0;i<eco.snakes.length;i++){
    for(var i=0;i<eco.snakes.length;i++){
      if(this.loc.distance(eco.snakes[i].seglist[0].loc)<seperationradius){
        var desired = JSVector.subGetNew(this.loc,eco.snakes[i].seglist[0].loc);
        desired.setMagnitude(maxspeed);
        sumSnake.add(desired);
      }
    }
}
  if(sumSnake.getMagnitude()>0){
    sumSnake.setMagnitude(maxspeed);
    var steering = JSVector.subGetNew(sumSnake,this.vel);
    steering.setMagnitude(maxspeed*5);
    //steering.multiply(1000);
    this.applyForce(steering);
  }
}

Vehicle.prototype.cohesion = function(){
  var sum = new JSVector();
  var count = 0;
  for(var i=0;i<eco.vehicles.length;i++){
    var v = eco.vehicles[i];
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

Vehicle.prototype.alignment = function(){
  var sum = new JSVector();
  var count = 0;
  for(var i=0;i<eco.vehicles.length;i++){
    var v = eco.vehicles[i];
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

Vehicle.prototype.applyForce = function(force){
  this.acc.add(force);
}
