
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

// -- args

module.exports = function (proto) {

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-resize
  proto.resize = function resize (w, h) {
    return this.arg(["-size", w +"x"+ h], ["-resize ", w +"x"+ h]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-scale
  proto.scale = function scale (w, h) {
    return this.arg(null, ["-scale", w +"x"+ h]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-profile
  proto.noProfile = function noProfile () {
    return this.arg(null, ['+profile "*"']);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-resample
  proto.resample = function resample (w, h) {
    return this.arg(null, ["-resample", w+"x"+h]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-rotate
  proto.rotate = function rotate (color, deg) {
    return this.arg(null, ["-background", color]).arg(null, ["-rotate", deg]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-flip
  proto.flip = function flip () {
    return this.arg(null, ["-flip"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-flop
  proto.flop = function flop () {
    return this.arg(null, ["-flop"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-crop
  proto.crop = function crop (w, h, x, y) {
    return this.arg(null, ["-crop", w+"x"+h + "+"+(x||0)+"+"+(y||0)]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-chop
  proto.chop = function chop (w, h, x, y) {
    return this.arg(["-chop", w+"x"+h + "+"+(x||0)+"+"+(y||0)]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.magnify = function magnify (factor) {
    return this.arg(["-magnify", factor || 1]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.minify = function minify (factor) {
    return this.arg(["-minify", factor || 1]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-quality
  proto.quality = function quality (val) {
    return this.arg(["-quality", val || 75]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-blur
  proto.blur = function blur (radius, sigma) {
    return this.arg(null, ["-blur", radius + (sigma ? "x"+sigma : "") ]);
  }

  // http://www.graphicsmagick.org/convert.html
  proto.charcoal = function charcoal (factor) {
    return this.arg(null, ["-charcoal", factor || 2]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-colorize
  proto.colorize = function colorize (r, g, b) {
    return this.arg(null, ["-colorize", [r,g,b].join(",")]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-modulate
  proto.modulate = function modulate (b, s, h) {
    return this.arg(null, ["-modulate", [b,s,h].join(",")]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-antialias
  // note: antialiasing is enabled by default
  proto.antialias = function antialias (disable) {
    return false === disable
      ? this.arg(null, ["+antialias"])
      : this;
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-depth
  proto.bitdepth = function bitdepth (val) {
    return this.arg(null, ["-depth", val]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-colors
  proto.colors = function colors (val) {
    return this.arg(null, ["-colors", val || 128]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-colorspace
  proto.colorspace = function colorspace (val) {
    return this.arg(null, ["-colorspace", val]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-comment
  proto.comment = comment("-comment");

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-contrast
  proto.contrast = function contrast (mult) {
    var args = []
      , arg = (parseInt(mult, 10) || 0) > 0
        ? "+contrast"
        : "-contrast";

    mult = Math.abs(mult) || 1;

    while (mult--) {
      args.push(arg);
    }

    return this.arg(null, args);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-cycle
  proto.cycle = function cycle (amount) {
    return this.arg(null, ["-cycle", amount || 2]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.despeckle = function despeckle () {
    return this.arg(null, ["-despeckle"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-dither
  // note: either colors() or monochrome() must be used for this
  // to take effect.
  proto.dither = function dither (on) {
    var sign = false === on
      ? "+"
      : "-";

    return this.arg(null, [sign + "dither"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.monochrome = function monochrome () {
    return this.arg(null, ["-monochrome"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.edge = function edge (radius) {
    return this.arg(null, ["-edge", radius || 1]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.emboss = function emboss (radius) {
    return this.arg(null, ["-emboss", radius || 1]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.enhance = function enhance () {
    return this.arg(null, ["-enhance"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.equalize = function equalize () {
    return this.arg(null, ["-equalize"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-gamma
  proto.gamma = function gamma (r, g, b) {
    return this.arg(null, ["-gamma", [r,g,b].join()]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.implode = function implode (factor) {
    return this.arg(null, ["-implode", factor || 1]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-comment
  proto.label = comment("-label");

  var limits = [ "disk", "file", "map", "memory", "pixels", "threads"];

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-limit
  proto.limit = function limit (type, val) {
    type = type.toLowerCase();

    if (!~limits.indexOf(type)) {
      return this;
    }

    return this.arg(null, ["-limit", type, val]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.median = function median (radius) {
    return this.arg(null, ["-median", radius || 1]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-negate
  proto.negative = function negative (grayscale) {
    var sign = grayscale ? "+" : "-";
    return this.arg(null, [sign + "negate"]);
  }

  var noises = [
      "uniform"
    , "gaussian"
    , "multiplicative"
    , "impulse"
    , "laplacian"
    , "poisson" ];

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-noise
  proto.noise = function noise (radius) {
    radius = (String(radius)).toLowerCase();

    var sign = ~noises.indexOf(radius)
      ? "+"
      : "-";

    return this.arg(null, [sign + "noise", radius]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-paint
  proto.paint = function paint (radius) {
    return this.arg(null, ["-paint", radius]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-raise
  proto.raise = function raise (w, h) {
    return this.arg(null, ["-raise", (w||0)+"x"+(h||0)]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-raise
  proto.lower = function lower (w, h) {
    return this.arg(null, ["+raise", (w||0)+"x"+(h||0)]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-region
  proto.region = function region (w, h, x, y) {
    w = w || 0;
    h = h || 0;
    x = x || 0;
    y = y || 0;
    return this.arg(null, ["-region", w + "x" + h + "+" + x + "+" + y]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-roll
  proto.roll = function roll (x, y) {
    x = ((x = parseInt(x, 10) || 0) > 0 ? "+" : "") + x;
    y = ((y = parseInt(y, 10) || 0) > 0 ? "+" : "") + y;
    return this.arg(null, ["-roll", x+y]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-sharpen
  proto.sharpen = function sharpen (radius, sigma) {
    sigma = sigma
      ? "x" + sigma
      : "";

    return this.arg(null, ["-sharpen", radius + sigma]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-solarize
  proto.solarize = function solarize (factor) {
    return this.arg(null, ["-solarize", (factor || 1)+"%"]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-spread
  proto.spread = function spread (amount) {
    return this.arg(null, ["-spread", amount || 5]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-swirl
  proto.swirl = function swirl (degrees) {
    return this.arg(null, ["-swirl", degrees || 180]);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-type
  proto.type = function type (type) {
    return this.arg(["-type", type]);
  }
};

/**
 * Generates a handler for comments/labels.
 */

function comment (arg) {
  return function (format) {
    format = String(format);

    format = "@" == format.charAt(0)
      ? format.substring(1)
      : format;

    return this.arg(null, [arg, '"' + format + '"']);
  }
}
