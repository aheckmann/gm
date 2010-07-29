// -- args

module.exports = function(proto){

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-resize
  proto.resize = function(w, h){
    return this.arg(["-size", w +"x"+ h], ["-resize ", w +"x"+ h])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-scale
  proto.scale = function(w, h){
    return this.arg(null, ["-scale", w +"x"+ h])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-profile
  proto.noProfile = function(){
    return this.arg(null, ['+profile "*"'])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-resample
  proto.resample = function(w, h){
    return this.arg(null, ["-resample", w+"x"+h])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-rotate
  proto.rotate = function(color, deg){
    return this.arg(null, ["-background", color]).arg(null, ["-rotate", deg])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-flip
  proto.flip = function(){
    return this.arg(null, ["-flip"])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-flop 
  proto.flop = function(){
    return this.arg(null, ["-flop"])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-crop
  proto.crop = function(w, h, x, y){
    return this.arg(null, ["-crop", w+"x"+h + "+"+(x||0)+"+"+(y||0)])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-chop
  proto.chop = function(w, h, x, y){
    return this.arg(["-chop", w+"x"+h + "+"+(x||0)+"+"+(y||0)])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.magnify = function(factor){
    return this.arg(["-magnify", factor])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.minify = function(factor){
    return this.arg(["-minify", factor])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-quality
  proto.quality = function(val){
    return this.arg(["-quality", val])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-blur
  proto.blur = function(radius, sigma){
    return this.arg(null, ["-blur", radius + (sigma ? "x"+sigma : "") ])
  }

  // http://www.graphicsmagick.org/convert.html
  proto.charcoal = function(factor){
    return this.arg(["-charcoal", factor])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-colorize
  proto.colorize = function(r, g, b){
    return this.arg(null, ["-colorize", [r,g,b].join(",")])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-modulate
  proto.modulate = function(b, s, h){
    return this.arg(null, ["-modulate", [b,s,h].join(",")])
  }
  
  // http://www.graphicsmagick.org/GraphicsMagick.html#details-colors
  proto.colors = function(val){
    return this.arg(null, ["-colors", val])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-comment
  proto.comment = function(format){
    format = String(format)
    format = "@" == format.charAt(0) ? format.substring(1) : format
    return this.arg(null, ["-comment", '"' + format + '"'])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-contrast
  proto.contrast = function(mult){
    var arg = (parseInt(mult) || 0) > 0 ? "+contrast" : "-contrast"
      , args = []
    mult = Math.abs(mult) || 1
    while (mult--) args.push(arg)
    return this.arg(null, args)
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-cycle
  proto.cycle = function(amount){
    return this.arg(null, ["-cycle", amount])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-depth
  proto.depth = function(val){
    return this.arg(null, ["-depth", val])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.despeckle = function(){
    return this.arg(null, ["-despeckle"])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.monochrome = function(){
    return this.arg(["-monochrome"])
  }

}
