window.onload = init;//  After the window has been loaded, go to init

// global variables for canvas and context
var canvas;
var ctx;
var particlesystem;
function init(){
  //get the canvas
  canvas = document.getElementById('cnv');
  // Set the dimensions of the canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.border = 'solid black 5px';
  canvas.style.backgroundColor = 'rgba(255,255,255, .9)';
  // get the context
  ctx = canvas.getContext('2d'); // This is the context

  particlesystem = new ParticleSys();

  animate();
}

function animate(){

  requestAnimationFrame(animate);
  ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
  for(var i=0;i<particlesystem.particles.length;i++){
    particlesystem.particles[i].run();
  }

  for(var i=0;i<particlesystem.particles.length;i++){
    healthcheck(i);
      if (particlesystem.particles.length<particlesystem.numParticles-5){
        addParticle(3);
      }
  }
}

function healthcheck(i){
  if (particlesystem.particles[i].lifespan<1){
    particlesystem.particles.splice(i, 1);
  }
}

function addParticle(numParticles){
  for(var i = 0;i<numParticles;i++){
    //var x = Math.random()*window.innerWidth;
    //var y = Math.random()*window.innerHeight;
    var loc = new JSVector(500, 500);
    var dx = Math.random()*2-1;
    var dy = Math.random()*-2-1;
    var vel = new JSVector(dx, dy);
    var ax = 0;
    var ay = 0.01;
    var base = 30;
    var height = 30;
    var acc = new JSVector(ax, ay);
    //var lifespan = Math.random()*1000;
    // var lifespan = Math.random()*1500;
    var lifespan = Math.random()*200+300;
    particlesystem.particles.push(new Particle(loc, vel, acc, base, height, lifespan))
}
}
