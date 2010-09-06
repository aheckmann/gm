
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

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
    return this.arg(["-magnify", factor || 1])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.minify = function(factor){
    return this.arg(["-minify", factor || 1])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-quality
  proto.quality = function(val){
    return this.arg(["-quality", val || 75])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-blur
  proto.blur = function(radius, sigma){
    return this.arg(null, ["-blur", radius + (sigma ? "x"+sigma : "") ])
  }

  // http://www.graphicsmagick.org/convert.html
  proto.charcoal = function(factor){
    return this.arg(null, ["-charcoal", factor || 2])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-colorize
  proto.colorize = function(r, g, b){
    return this.arg(null, ["-colorize", [r,g,b].join(",")])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-modulate
  proto.modulate = function(b, s, h){
    return this.arg(null, ["-modulate", [b,s,h].join(",")])
  }
  
  // http://www.graphicsmagick.org/GraphicsMagick.html#details-antialias
  // note: antialiasing is enabled by default 
  proto.antialias = function(disable){
    return false === disable
      ? this.arg(null, ["+antialias"])
      : this
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-depth
  proto.bitdepth = function(val){
    return this.arg(null, ["-depth", val])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-colors
  proto.colors = function(val){
    return this.arg(null, ["-colors", val || 128])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-colorspace
  proto.colorspace = function(val){
    return this.arg(null, ["-colorspace", val]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-comment
  proto.comment = comment("-comment")

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
    return this.arg(null, ["-cycle", amount || 2])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.despeckle = function(){
    return this.arg(null, ["-despeckle"])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-dither
  // note: either colors() or monochrome() must be used for this
  // to take effect.
  proto.dither = function(on){
    return this.arg(null, [(false === on ? "+" : "-") + "dither"])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.monochrome = function(){
    return this.arg(null, ["-monochrome"])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.edge = function(radius){
    return this.arg(null, ["-edge", radius || 1])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.emboss = function(radius){
    return this.arg(null, ["-emboss", radius || 1])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.enhance = function(){
    return this.arg(null, ["-enhance"])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.equalize = function(){
    return this.arg(null, ["-equalize"])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-gamma
  proto.gamma = function(r, g, b){
    return this.arg(null, ["-gamma", [r,g,b].join(",")])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.implode = function(factor){
    return this.arg(null, ["-implode", factor || 1])
  }
  
  // http://www.graphicsmagick.org/GraphicsMagick.html#details-comment
  proto.label = comment("-label")

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-limit
  proto.limit = function(type, val){
    type = type.toLowerCase()
    if (-1 == [ "disk"
              , "file"
              , "map"
              , "memory"
              , "pixels"
              , "threads"
              ].indexOf(type))
      return this
    return this.arg(null, ["-limit", type, val])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.median = function(radius){
    return this.arg(null, ["-median", radius || 1])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-negate
  proto.negative = function(grayscale){
    return this.arg(null, [ (grayscale ? "+" : "-") + "negate" ])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-noise
  proto.noise = function(radius){
    radius = (String(radius)).toLowerCase()
    if (-1 == [ "uniform"
              , "gaussian"
              , "multiplicative"
              , "impulse"
              , "laplacian"
              , "poisson"
              ].indexOf(radius))
      return this.arg(null, ["-noise", radius])
    return this.arg(null, ["+noise", radius])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-paint
  proto.paint = function(radius){
    return this.arg(null, ["-paint", radius])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-raise
  proto.raise = function(w, h){
    return this.arg(null, ["-raise", (w||0)+"x"+(h||0)])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-raise
  proto.lower = function(w, h){
    return this.arg(null, ["+raise", (w||0)+"x"+(h||0)])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-region
  proto.region = function(w, h, x, y){
    return this.arg(null, ["-region", (w||0)+"x"+(h||0) + "+"+(x||0)+"+"+(y||0)])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-roll
  proto.roll = function(x, y){
    x = ((x = parseInt(x) || 0) > 0 ? "+" : "") + x
    y = ((y = parseInt(y) || 0) > 0 ? "+" : "") + y
    return this.arg(null, ["-roll", x+y])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-sharpen
  proto.sharpen = function(radius, sigma){
    return this.arg(null, ["-sharpen", radius + (sigma ? "x"+sigma : "") ])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-solarize
  proto.solarize = function(factor){
    return this.arg(null, ["-solarize", (factor || 1)+"%"])
  }
  
  // http://www.graphicsmagick.org/GraphicsMagick.html#details-spread
  proto.spread = function(amount){
    return this.arg(null, ["-spread", amount || 5])
  }
  
  // http://www.graphicsmagick.org/GraphicsMagick.html#details-swirl
  proto.swirl = function(degrees){
    return this.arg(null, ["-swirl", degrees || 180])
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-type
  proto.type = function(type){
    return this.arg(["-type", type])
  }
  
}

function comment(arg){
  return function(format){
    format = String(format)
    format = "@" == format.charAt(0) ? format.substring(1) : format
    return this.arg(null, [arg, '"' + format + '"'])
  }
}
