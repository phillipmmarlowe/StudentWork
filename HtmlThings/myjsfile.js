window.onload = init;
var canvas;
var ctx;

function init(){
  var header = document.createElement('div');
  canvas = document.createElement('canvas');
  header.setAttribute('id','header');
  canvas.setAttribute('id','canvas');
  var wrapper = document.getElementbyId('wrapper');
  wrapper.appendChild(header);
  wrapper.appendChild(canvas);
  //get the canvas
  // Set the dimensions of the canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.border = 'solid black 5px';
  canvas.style.backgroundColor = 'rgba(12,15,25, .9)';
  // get the context
  ctx = canvas.getContext('2d'); // This is the context

}
