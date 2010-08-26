module.exports = function(proto){

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-fill
  proto.setFill = function(color){
    return this.arg(["-fill", "'" + color + "'"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-fill
  proto.noFill = function(){
    return this.arg(["-fill none"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-stroke
  proto.setStroke = function(color){
    return this.arg(["-stroke", "'" + color + "'"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-stroke
  proto.noStroke = function(){
    return this.arg(["-stroke none"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-strokewidth
  proto.setStrokeWidth = function(width){
    return this.arg(["-strokewidth", width]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-font
  proto.setFont = function(font){
    return this.arg(["-font", font]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.setPointSize = function(size){
    return this.arg(["-pointsize", size]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  proto.draw = function(args){
    return this.arg(["-draw", "'", args.join(" "), "'"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  proto.drawPoint = function(x, y){
    return this.draw(["point", x +","+ y]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  proto.drawLine = function(x0, y0, x1, y1){
    return this.draw(["line", x0+","+y0, x1+","+y1]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  proto.drawRectangle = function(x0, y0, x1, y1){
    return this.draw(["rectangle", x0+","+y0, x1+","+y1]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  proto.drawRoundRectangle = function(x0, y0, x1, y1, wc, hc){
    if (hc == undefined) hc = wc;
    return this.draw(["roundRectangle", x0+","+y0, x1+","+y1, wc+","+hc]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  proto.drawArc = function(x0, y0, x1, y1, a0, a1){
    return this.draw(["arc", x0+","+y0, x1+","+y1, a0+","+a1]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  proto.drawEllipse = function(x0, y0, rx, ry, a0, a1){
    if (a0 == undefined) a0 = 0;
    if (a1 == undefined) a1 = 360;
    return this.draw(["ellipse", x0+","+y0, rx+","+ry, a0+","+a1]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  proto.drawCircle = function(x0, y0, x1, y1){
    return this.draw(["circle", x0+","+y0, x1+","+y1]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  proto.drawPolyline = function(points){
    return this.draw(["polyline"].concat(formatPoints(points)));
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  proto.drawPolygon = function(points){
    return this.draw(["polygon"].concat(formatPoints(points)));
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  proto.drawBezier = function(points){
    return this.draw(["bezier"].concat(formatPoints(points)));
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  proto.drawText = function(x0, y0, str, gravity){
    var gravityPrimitive = [];
    if (-1 != [ "NorthWest"
	      , "North"
              , "NorthEast"
	      , "West"
              , "Center"
	      , "East"
              , "SouthWest"
              , "South"
              , "SouthEast"
	      ].indexOf(gravity))
      gravityPrimitive = ["gravity", gravity];
    return this.draw(gravityPrimitive.concat(["text", x0+","+y0, str]));
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  proto.color = function (x0, y0, method){
    method = method.toLowerCase();
    return this.draw(["color", x0+","+y0, method]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  proto.matte = function (x0, y0, method){
    method = method.toLowerCase();
    return this.draw(["matte", x0+","+y0, method]);
  }

}

function formatPoints(points){
  var result = [];
  for (var i=0 ; i<points.length ; i++)
    result.push(points[i].join(","));
  return result;
}
