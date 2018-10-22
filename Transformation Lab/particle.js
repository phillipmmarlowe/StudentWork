function Particle(loc, vel, acc, base, height, lifespan){
  this.loc = loc;
  this.vel = vel;
  this.acc = acc;
  this.base = base;
  this.height = height;
  this.lifespan = lifespan;
}

function ParticleSys(){
  this.numParticles = 13;
  this.particles = [];
  var templocx = 300;
  var templocy = 300;
  for(var i = 0;i<this.numParticles;i++){
    //var x = Math.random()*window.innerWidth;
    //var y = Math.random()*window.innerHeight;
    var loc = new JSVector(templocx, templocy);
    var dx = Math.random()*10-5;
    var dy = Math.random()*10-5;
    var vel = new JSVector(dx, dy);
    var ax = Math.random()*2-1;
    var ay = Math.random()*2-1;
    var base = Math.random()*30;
    var height = Math.random()*30;
    var acc = new JSVector(ax, ay);
    //var lifespan = Math.random()*1000;
    var lifespan = Math.random()*400;
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
  this.acc.x = Math.random()*2-1;
  this.acc.y = Math.random()*2-1;
  this.vel.x += this.acc.x;
  this.vel.y += this.acc.y;
  this.vel.limit(10);
  this.acc.limit(5);
  this.lifespan -= 1;
  this.render();
}


Particle.prototype.render = function(){
  ctx.strokeStyle = 'rgba(75,0,130)';
  ctx.fillStyle = "rgba(75,0,130)";
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

// Particle.prototype.healthcheck = function(){
//   if (this.lifespan<1){
//
//   }
// }
