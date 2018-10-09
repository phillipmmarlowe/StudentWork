function Particle(loc, vel, rad, lifespan){
  this.loc = loc;
  this.vel = vel;
  this.rad = rad;
  this.lifespan = lifespan;
}

function ParticleSys(){
  this.numParticles = 10;
  this.particles = [];
  for(var i = 0;i<this.numParticles;i++){
    var x = Math.random()*window.innerWidth;
    var y = Math.random()*window.innerHeight;
    var loc = new JSVector(x, y);
    var dx = Math.random()*10-5;
    var dy = Math.random()*10-5;
    var vel = new JSVector(dx, dy);
    var r = Math.random()*20 + 10;
    var lifespan = Math.random()*1000;
    this.particles.push(new Particle(loc, vel, r, lifespan))
  }
}

Particle.prototype.run = function(){
  this.checkEdges();
  this.update();
}

Particle.prototype.checkEdges = function(){
  if(this.loc.x > window.innerWidth || this.loc.x < 0)  this.vel.x = -this.vel.x;
  if(this.loc.y > window.innerHeight || this.loc.y < 0)  this.vel.y = -this.vel.y;
}

Particle.prototype.update = function(){
  this.loc.x += this.vel.x;
  this.loc.y += this.vel.y;
  this.lifespan -= 1;
  this.render();
}

Particle.prototype.render = function(){
  ctx.strokeStyle = 'rgba(75,0,130)';
  ctx.fillStyle = "rgba(75,0,130)";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(this.loc.x,this.loc.y, this.rad, Math.PI*2, 0, false);
  ctx.stroke();

}

// Particle.prototype.healthcheck = function(){
//   if (this.lifespan<1){
//
//   }
// }
