// JSVector -- a Javascript 2D vector class

// The class constructor
function JSVector(x,y){
    if(arguments.length == 2) {
        // called with two arguments
        this.x = x;
        this.y = y;
        //x=this.x,
        //y=this.y,
    }
    else {
        this.x = this.y = 0;    // default to 0,0
        //x=0, y=0;
    }
}

// Set the magnitude of the vector,
// retaining the angle (direction).
JSVector.prototype.setMagnitude = function(mag){
  var dir = this.getDirection();
  this.y= mag*Math.sin(dir);
  this.x= mag*Math.cos(dir);
  return this;
}

// Get the magnitude of the vector using pythagorean theorem
JSVector.prototype.getMagnitude = function(){
  return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2));
}

// Set the angle (direction) of the vector,
// retaining the magnitude.
JSVector.prototype.setDirection = function(angle){
  var mag = this.getMagnitude();
  this.y = mag*Math.sin(angle);
  this.x = mag*Math.cos(angle);
  return this;
}

// Get the direction (angle) of the vector
JSVector.prototype.getDirection = function(){
  return Math.atan2(this.y,this.x);
}

// Add another vector to this vector
JSVector.prototype.add = function(v2){
  this.x+=v2.x;
  this.y+=v2.y;
  return this;
}

// Subtract another vector from this vector
JSVector.prototype.sub = function(v2){
  this.x-=v2.x;
  this.y-=v2.y;
  return this;
}

// Class method to return a new vector that is the sum of two vectors
JSVector.addGetNew = function(v1,v2){
  var v3 = new JSVector();
  v3.x=v1.x+v2.x;
  v3.y=v1.y+v2.y;
  return v3;
}

// Class method to return a new vector that is the difference of two vectors
JSVector.subGetNew = function(v1,v2){
  var v3 = new JSVector();
  v3.x=v1.x-v2.x;
  v3.y=v1.y-v2.y;
  return v3;
}

// Multiply this vector by a scalar
JSVector.prototype.multiply = function(scalar){
  this.x *= scalar;
  this.y *= scalar;
  return this;
}

// Divide this vector by a scalar
JSVector.prototype.divide = function(scalar){
  this.x /= scalar;
  this.y /= scalar;
  return this;
}

// Normalize this vector so that it has a magnitude of 1
JSVector.prototype.normalize = function(){
  this.setMagnitude(1);
  return this;
}

// Limit the magnitude of this vector
JSVector.prototype.limit = function(lim){
  if (this.getMagnitude()>lim){
    this.setMagnitude(lim);
  }
  return this;
}

// Get the distance between this vector and another one
JSVector.prototype.distance = function(v2){
  return Math.sqrt(this.distanceSquared(v2));
}

// Get square of the distance between this vector and another one
JSVector.prototype.distanceSquared = function(v2){
  return Math.pow(v2.x-this.x,2)+Math.pow(v2.y-this.y,2);
}

// Rotate this vector by some number of radians
// using the rotation matrix |  -cos   -sin  |
//                           |  sin   +cos  |

JSVector.prototype.rotate = function(angle) {
  this.setDirection(this.getDirection()+angle);
  return this;
}


// Get the angle between this vector and another one
JSVector.prototype.angleBetween = function(v2){
  return Math.abs(v2.getDirection()) - Math.abs(this.getDirection());
}

// Make a copy of this vector
JSVector.prototype.copy = function(){
  var v = new JSVector();
  v.x=this.x
  v.y=this.y
  return v;

}

// Override inherited toString() to describe this instance
JSVector.prototype.toString = function() {
  var angle = this.getDirection();
  angle*180/Math.PI;
  var mag = this.getMagnitude();
  return 'Angle: ' + angle.toFixed(2) + ' Magnitude: ' + mag.toFixed(2) + ' X: ' + this.x.toFixed(2) + 'Y: ' + this.y.toFixed(2);
	}
