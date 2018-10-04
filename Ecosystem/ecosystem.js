var canvas;
var ctx;
function Ecosystem(){
  this.numsnakes = 6;
  this.snakes = [];
  this.balls = [];
  this.numBalls = 10;
  canvas = document.getElementById('cnv');
  // Set the dimensions of the canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.border = 'solid black 5px';
  canvas.style.backgroundColor = 'rgba(12,15,25, .9)';
  //get the context
  ctx = canvas.getContext('2d'); // This is the context
  for(var i=0;i<this.numsnakes;i++){
  var boid = new Boid();
  var snake = new Snake(10, boid);
  this.snakes.push(snake);
  }
  for(let i = 0; i < this.numBalls; i++){
    var x = Math.random()*canvas.width;
    var y = Math.random()*canvas.height;
    var loc = new JSVector(x, y);
    var dx = Math.random()*10-5;
    var dy = Math.random()*10-5;
    var vel = new JSVector(dx, dy);
    var r = Math.random()*20 + 10;
    this.balls.push(new Ball(loc, vel, r))
  }
}

Ecosystem.prototype.run = function(){
  this.snakesrun();
  this.ballsrun();
}

Ecosystem.prototype.snakesrun = function(){
  // var numsnakes = 1;
  // var snakes = [];
  for(var i=0;i<this.snakes.length;i++){
    this.snakes[i].run();
  }
}

Ecosystem.prototype.ballsrun = function(){
  //var balls = [];
  for(let i = 0; i < this.balls.length; i++){
    this.balls[i].run();
  }
}
