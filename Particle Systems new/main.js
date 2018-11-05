window.addEventListener("load",init);//  After the window has been loaded, go to init
// global variables for canvas and context
var canvas;
var ctx;
var particleSystems;
var testmover;
var testtarget;
function init(){
  //get the canvas
  canvas = document.getElementById('cnv');
  // Set the dimensions of the canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.border = 'solid black 5px';
  canvas.style.backgroundColor = 'rgba(255,255,255, .9)';
  //canvas.addEventListener("click",handleMouseClick);
  // get the context
  ctx = canvas.getContext('2d'); // This is the context
  particleSystems = [];
  var x = 100;
  var y = 100;
  var loc = new JSVector(x, y);
  var dx = Math.random()*2-1;
  var dy = Math.random()*-1-1;
  var vel = new JSVector(dx, dy);
  var ax = 0;
  var ay = 0;
  var base = Math.random()*40+10;
  var height = Math.random()*40+10;
  var acc = new JSVector(ax, ay);
  var lifespan = 1000;
  testmover = new Particle(loc, vel, acc, base, height, lifespan);
  var x = 700;
  var y = 700;
  var loc = new JSVector(x, y);
  var dx = Math.random()*2-1;
  var dy = Math.random()*-1-1;
  var vel = new JSVector();
  var ax = 0;
  var ay = 0;
  var base = Math.random()*40+10;
  var height = Math.random()*40+10;
  var acc = new JSVector(ax, ay);
  var lifespan = 1000;
  testtarget = new Particle(loc, vel, acc, base, height, lifespan);
  animate();
}

function animate(){

  requestAnimationFrame(animate);
  ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
  testmover.run();
  testtarget.run();
  for(var i=0;i<particleSystems.length;i++){
    particleSystems[i].run();
  }

}

  function handleMouseClick(event){
    particleSystems.push(new ParticleSys(event.clientX,event.clientY));
  }
