function Vehicle(loc, vel, acc, base, height){
  this.loc = loc;
  this.vel = vel;
  this.acc = acc;
  this.height = height;
  this.base = base;
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
  this.loc.x += this.vel.x;
  this.loc.y += this.vel.y;
  // this.acc.x = Math.random()*2-1;
  // this.acc.y = Math.random()*2-1;
//   if(this.lifespan<900){
   this.vel.x += this.acc.x;
   this.vel.y += this.acc.y;
//   this.seek(testtarget);
// }
  this.vel.limit(5);
  //this.acc.limit();
  //this.lifespan -= 1;
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

Vehicle.prototype.cohesion = function(){
  for(var i=0;i<vehicles.length;i++){
    var v = vehicles[i];
    if(v==this){
      continue;
    }
    
  }
}
