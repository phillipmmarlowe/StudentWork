function Particle(loc, vel, acc, base, height, lifespan){
  this.loc = loc;
  this.vel = vel;
  this.acc = acc;
  this.base = base;
  this.height = height;
  this.lifespan = lifespan;
}

function ParticleSys(){
  this.numParticles = 12;
  this.particles = [];
  for(var i = 0;i<this.numParticles;i++){
    var x = Math.random()*window.innerWidth;
    var y = Math.random()*window.innerHeight;
    var loc = new JSVector(x, y);
    var dx = Math.random()*10-5;
    var dy = Math.random()*10-5;
    var vel = new JSVector(dx, dy);
    var ax = 1;
    var ay = 1;
    var base = 20;
    var height = 20;
    var acc = new JSVector(ax, ay);
    //var lifespan = Math.random()*1000;
    var lifespan = 1000;
    this.particles.push(new Particle(loc, vel, acc, base, height, lifespan))
  }
}

Particle.prototype.run = function(){
  this.checkEdges();
  this.update();
}

Particle.prototype.checkEdges = function(){
  if(this.loc.x > window.innerWidth || this.loc.x < 0)  this.vel.x = -this.vel.x
  if(this.loc.y > window.innerHeight || this.loc.y < 0)  this.vel.y = -this.vel.y
}

Particle.prototype.update = function(){
  this.loc.x += this.vel.x;
  this.loc.y += this.vel.y;
  this.vel.x += this.acc.x;
  this.vel.y += this.acc.y;
  this.vel.limit(10);
  this.acc.limit(5);
  //this.lifespan -= 1;
  this.render();
}


Particle.prototype.render = function(){
  ctx.strokeStyle = 'rgba(75,0,130)';
  ctx.fillStyle = "rgba(75,0,130)";
  ctx.translate(this.loc.x,this.loc.y);
  ctx.rotate(this.vel.getDirection());
  ctx.beginPath();
  ctx.lineTo(this.base,0);
  ctx.lineTo(this.base/2,this.height);
  ctx.lineTo(0,0);
  //ctx.arc(this.loc.x,this.loc.y, this.rad, Math.PI*2, 0, false);
  ctx.fill();
  ctx.restore();
}

// Particle.prototype.healthcheck = function(){
//   if (this.lifespan<1){
//
//   }
// }
