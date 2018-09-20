
function Boid(){
  this.orbiter = new Orbiter(this);
  this.loc = new JSVector(200,300);
  this.vel = new JSVector(2,2);
  this.rad = 10;
}

function Orbiter(boid){
  this.rad = 5;
  this.distance = new JSVector(25,0);
  this.vel = 0.1;
  this.boid = boid;
}

Orbiter.prototype.update = function(){
  this.distance.rotate(this.vel);

}

Orbiter.prototype.render = function(){
  var loc = JSVector.addGetNew(this.boid.loc,this.distance);
  ctx.strokeStyle = 'rgba(55,50,220)';
  ctx.fillStyle = "rgba(255,162,12)";
  ctx.beginPath();
  ctx.arc(loc.x,loc.y, this.rad, 0, Math.PI*2, false);
  ctx.stroke();
  ctx.fill();
}

Orbiter.prototype.run = function(){
  this.update();
  this.render();

}

Boid.prototype.run = function(){
  this.update();
  this.render();
}

Orbiter.prototype.update = function(){
  this.distance.rotate(this.vel);
  Orbiter.prototype.render = function(){
  var loc = JSVector.addGetNew(this.boid.loc,this.distance);
  ctx.strokeStyle = 'rgba(55,50,220)';
  ctx.fillStyle = "rgba(255,162,12)";
  ctx.beginPath();
  ctx.arc(loc.x,loc.y, this.rad, 0, Math.PI*2, false);
  ctx.stroke();
  ctx.fill();
}
