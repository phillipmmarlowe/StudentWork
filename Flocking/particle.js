function Particle(loc, vel, acc, base, height, lifespan){
  this.loc = loc;
  this.vel = vel;
  this.acc = acc;
  this.base = base;
  this.height = height;
  this.lifespan = lifespan;
}

function ParticleSys(x,y){
  this.numParticles = 20;
  this.particles = [];
  this.loc = new JSVector(x,y);
  for(var i = 0;i<this.numParticles;i++){
    this.addParticle();
  }
}

ParticleSys.prototype.run = function(){
  for(var i=0;i<this.particles.length;i++){
    this.particles[i].run();
  }
  for(var i=0;i<this.particles.length;i++){
    this.healthcheck(i);
      }
  }


Particle.prototype.run = function(){
  //this.checkEdges();
  this.update();
}

Particle.prototype.checkEdges = function(){
  if(this.loc.x > window.innerWidth || this.loc.x < 0)  this.vel.x = -this.vel.x
  if((this.loc.y > window.innerHeight || this.loc.y < 0 )&& this.lifespan > 200)  this.vel.y = -this.vel.y
}

Particle.prototype.update = function(){
  this.loc.x += this.vel.x;
  this.loc.y += this.vel.y;
  // this.acc.x = Math.random()*2-1;
  // this.acc.y = Math.random()*2-1;
  this.vel.x += this.acc.x;
  this.vel.y += this.acc.y;
  this.vel.limit(1);
  //this.acc.limit();
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
ParticleSys.prototype.healthcheck = function(i){
  if (this.particles[i].lifespan<1){
    this.particles.splice(i, 1);
    this.addParticle();
  }
}
ParticleSys.prototype.addParticle = function(){
    //var x = Math.random()*window.innerWidth;
    //var y = Math.random()*window.innerHeight;
    ///var locc = new JSVector(Math.random()*100-50, Math.random()*100-50);
    var dx = Math.random()*100-50;
    var dy = Math.random()*-1-1;
    var vel = new JSVector(dx, dy);
    var ax = 0;
    var ay = 0.01;
    var base = 30;
    var height = 30;
    var acc = new JSVector(ax, ay);
    //var lifespan = Math.random()*1000;
    // var lifespan = Math.random()*1500;
    var lifespan = Math.random()*200+300;
    //var temp = new JSVector(mouseX/2,mouseY/2);
    //this.loc = JSVector.addGetNew(this.loc,temp);
    this.particles.push(new Particle(this.loc, vel, acc, base, height, lifespan));
}
