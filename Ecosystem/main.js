window.onload = init;//  After the window has been loaded, go to init

// global variables for canvas and context
// var numsnakes = 4;
// var snakes = [];
var maxspeed = 2;
var maxsteeringsep = .3;
var seperationradius = 50;
var maxsteeringcoh = .3;
var cohesionradius = 100;
var maxsteeringalign = .1;
var alignmentradius = 100;
  var eco;
function init(){
  //get the canvas
  // canvas = document.getElementById('cnv');
  // // Set the dimensions of the canvas
  // canvas.width = window.innerWidth;
  // canvas.height = window.innerHeight;
  // canvas.style.border = 'solid black 5px';
  // canvas.style.backgroundColor = 'rgba(12,15,25, .9)';
  // //get the context
  // ctx = canvas.getContext('2d'); // This is the context
  // for(var i=0;i<numsnakes;i++){
  // var boid = new Boid();
  // var snake = new Snake(10, boid);
  // snakes.push(snake);
  // }
  // animate();
  eco = new Ecosystem();
  animate();
}

function animate(){

  requestAnimationFrame(animate);
  ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
  //for(let i = 0; i < balls.length; i++){
    //balls[i].run();
  //}
  //orbiter.run();
//   for(var i=0;i<snakes.length;i++){
//     snakes[i].run();
//   }
  eco.run();
}
