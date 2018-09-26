function Segment(){
  var segrad = 10;
  var loc = new JSVector();
}
function Snake(Segment){
  var seglist = [];
  var segnum = 6;
  var seg0 = new segment();
  seglist.push(seg0);
  for (var i = 1; i < segnum, i++) {
    var temp = new segment();
    temp.loc.x = seglist[i-1].segrad*2;
    temp.loc.y = seglist[i-1].segrad*2;
    seglist.push(temp);
  }
snake.prototype.run = function(){
  this.render();
  this.update();
}
snake.prototype.render = function(){

}
snake.prototype.update = function(){
  var temp = JSVector.subGetNew(seglist[0],boid.loc);
  seglist[0].loc.JSVector.add(seglist[0].loc,temp);
}
