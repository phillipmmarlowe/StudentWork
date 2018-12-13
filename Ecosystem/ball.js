

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
  if(this.loc.x > canvas.width)  this.loc.x = 0;
  if(this.loc.x < 0) this.loc.x = canvas.width;
  if(this.loc.y > canvas.height)  this.loc.y = 0;
  if(this.loc.y < 0) this.loc.y = canvas.height;
}

Ball.prototype.update = function(){
  this.seperation();
  this.cohesion();
  this.alignment();
  //this.acc.limit(.1);
  this.vel.x += this.acc.x;
  this.vel.y += this.acc.y;
  this.loc.x += this.vel.x;
  this.loc.y += this.vel.y;
  this.vel.setMagnitude(maxspeed);
  this.acc.multiply(0);
  this.render();
}

Ball.prototype.render = function(){
  ctx.strokeStyle = this.color;
  ctx.fillStyle = this.color;
  ctx.save();
  //ctx.translate(this.loc.x,this.loc.y);
  //ctx.rotate(this.vel.getDirection());
  ctx.beginPath();
  ctx.arc(this.loc.x,this.loc.y, this.rad, 0, Math.PI*2, false);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

Ball.prototype.seperation = function(){
  var sum = new JSVector();
  for(var i=0;i<eco.balls.length;i++){
    var v = eco.balls[i];
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

Ball.prototype.seperationSnake = function(){
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

Ball.prototype.cohesion = function(){
  var sum = new JSVector();
  var count = 0;
  for(var i=0;i<eco.balls.length;i++){
    var v = eco.balls[i];
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

Ball.prototype.applyForce = function(force){
  this.acc.add(force);
}
