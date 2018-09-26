
function Boid(){
  //this.orbiter = new Orbiter(this);
  this.loc = new JSVector(200,300);
  this.vel = new JSVector(2,2);
  this.rad = 45;
}

function Orbiter(boid){
  this.rad = 20;
  this.distance = new JSVector(100,0);
  this.vel = 0.08;
  this.boid = boid;
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
  ctx.strokeStyle = 'rgba(55,50,220)';
  ctx.fillStyle = "rgba(255,162,12)";
  ctx.beginPath();
  ctx.arc(loc.x ,loc.y ,this.rad ,0 ,Math.PI*2 ,false);
  ctx.stroke();
  ctx.fill();
}

Boid.prototype.run = function(){
  this.checkEdges();
  this.update();
  this.render();
}

Boid.prototype.update = function(){
  this.loc.x += this.vel.x;
  this.loc.y += this.vel.y;
}

Boid.prototype.render = function(){
  ctx.strokeStyle = 'rgba(55,50,220)';
  ctx.fillStyle = "rgba(100,162,120)";
  ctx.beginPath();
  ctx.arc(this.loc.x,this.loc.y, this.rad, 0, Math.PI*2, false);
  ctx.stroke();
  ctx.fill();
}

Boid.prototype.checkEdges = function(){
  if(this.loc.x > canvas.width || this.loc.x < 0)  this.vel.x = -this.vel.x;
  if(this.loc.y > canvas.height || this.loc.y < 0)  this.vel.y = -this.vel.y;
}
