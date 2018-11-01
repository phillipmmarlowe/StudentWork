window.addEventListener("load",init);//  After the window has been loaded, go to init
// global variables for canvas and context
var canvas;
var ctx;
var particleSystems;
function init(){
  //get the canvas
  canvas = document.getElementById('cnv');
  // Set the dimensions of the canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.border = 'solid black 5px';
  canvas.style.backgroundColor = 'rgba(255,255,255, .9)';
  canvas.addEventListener("click",handleMouseClick);
  // get the context
  ctx = canvas.getContext('2d'); // This is the context
  particleSystems = [];


  animate();
}

function animate(){

  requestAnimationFrame(animate);
  ctx.clearRect(0,0,window.innerWidth, window.innerHeight);

  for(var i=0;i<particleSystems.length;i++){
    particleSystems[i].run();
  }

}

  function handleMouseClick(event){
    particleSystems.push(new ParticleSys(event.clientX,event.clientY));
  }
