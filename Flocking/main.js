window.addEventListener("load",init);//  After the window has been loaded, go to init
// global variables for canvas and context
//use change event listener for sliders
var canvas;
var ctx;
var vehicles;
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
  vehicles = [];
  for(var i = 0;i<60;i++){
    var x = Math.random()*canvas.width;
    var y = Math.random()*canvas.height;
    var loc = new JSVector(x, y);
    var dx = Math.random()*2-1;
    var dy = Math.random()*2-1;
    var vel = new JSVector(dx, dy);
    var ax = 0;
    var ay = 0;
    var base = 14;
    var height = 20;
    var acc = new JSVector(ax, ay);
    vehicles.push(new Vehicle(loc, vel, acc, base, height));
  }
  animate();
}

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,canvas.width, canvas.height);
  for(var i = 0;i<vehicles.length;i++){
    vehicles[i].run();
  }
  // for(var i=0;i<vehicles.length;i++){
  //   for(var j=0;j<vehicles.length;j++){
  //     if(j==i){
  //       continue;
  //     }
  //     if(vehicles[i].loc.distance(vehicles[j].loc)>10){
  //       vehicles[j].seek(vehicles[i]);
  //     }
  //   }
  // }
}
