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
  for(var i=0;i<this.particlesystem.particles.length;i++){
    this.particlesystem.particles[i].run();
  }

  for(var i=0;i<this.particlesystem.particles.length;i++){
    healthcheck(i);
  }
}

function healthcheck(i){
  if (this.particlesystem.particles[i].lifespan<1){
    this.particlesystem.particles.splice(i, 1);
  }
}
