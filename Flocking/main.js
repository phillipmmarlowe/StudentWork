window.addEventListener("load",init);//  After the window has been loaded, go to init
// global variables for canvas and context
var canvas;
var ctx;
function init(){
  //get the canvas
  canvas = document.getElementById('cnv');
  // Set the dimensions of the canvas
  canvas.width = 800;
  canvas.height = 600;
  canvas.style.border = 'solid black 5px';
  canvas.style.backgroundColor = 'rgba(255,255,255, .9)';
  //canvas.addEventListener("click",handleMouseClick);
  // get the context
  ctx = canvas.getContext('2d'); // This is the context
  animate();
}

function animate(){

  requestAnimationFrame(animate);
  ctx.clearRect(0,0,canvas.width, canvas.height);

}
