module.exports = function(proto){

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-fill
  proto.fill = function(color){
    return this.arg(
      null
    , [ "-fill"
      , "'" + (color || "none") + "'"
      ]
    );
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-stroke
  proto.stroke = function(color, width){
    if (width)
      this.strokeWidth(width)
    return this.arg(
      null
    , [ "-stroke"
      , "'" + (color || "none") + "'"
      ]
    );
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-strokewidth
  proto.strokeWidth = function(width){
    return this.arg(null, ["-strokewidth", width]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-font
  proto.font = function(font, size){
    if (size) 
      this.fontSize(size);
    return this.arg(null, ["-font", font]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.fontSize = function(size){
    return this.arg(null, ["-pointsize", size]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  proto.draw = function(args){
    return this.arg(null, ["-draw", "'"+ args.join(" ") + "'"]);
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
  proto.drawRectangle = function(x0, y0, x1, y1, wc, hc){
    var shape = "rectangle"
      , lastarg
    if ("undefined" != typeof wc){
      shape = "roundRectangle";
      if ("undefined" == typeof hc) hc = wc;
      lastarg = wc+","+hc;
    }
    return this.draw([shape, x0+","+y0, x1+","+y1, lastarg]);
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
  proto.drawPolyline = function(){
    return this.draw(["polyline"].concat(formatPoints(arguments)));
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  proto.drawPolygon = function(){
    return this.draw(["polygon"].concat(formatPoints(arguments)));
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  proto.drawBezier = function(){
    return this.draw(["bezier"].concat(formatPoints(arguments)));
  }

  proto._gravities = 
    [ "northwest"
	  , "north"
    , "northeast"
	  , "west"
    , "center"
	  , "east"
    , "southwest"
    , "south"
    , "southeast"
	  ] 
  ;

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  proto.drawText = function(x0, y0, text, gravity){
    var gravity = String(gravity || "").toLowerCase()
      , arg = ["text", x0+","+y0, '"'+text+'"'];
    if (~this._gravities.indexOf(gravity))
      arg = ["gravity", gravity].concat(arg);
    return this.draw(arg);
  }

  proto._drawProps =
    [ "color"
    , "matte"
    ]
  ;

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-draw
  proto.setDraw = function(prop, x, y, method){
    prop = String(prop || "").toLowerCase();
    if (!~this._drawProps.indexOf(prop))
      return this;
    return this.draw([prop, x+","+y, method]);
  }

}

function formatPoints(points){
  var len = points.length
    , result = []
    , i = 0
  for (; i < len; ++i)
    result.push( points[i].join(",") );
  return result;
}
