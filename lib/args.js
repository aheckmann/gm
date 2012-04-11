// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

/**
 * Extend proto
 */

module.exports = function (proto) {

  // strip the image of any profiles or comments.
  proto.strip = function strip () {
    return this.out("-strip");
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-interlace
  proto.interlace = function interlace (type) {
    return this.out("-interlace", type || "None");
  }

  // force output format
  proto.setFormat = function setFormat (format) {
    if (format) this._outputFormat = format;
    return this;
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-resize
  proto.resize = function resize (w, h, options) {
    options = options || "";
		var geometry;
		if (w && h) {
			geometry = w + "x" + h + options
		} else if (w && !h) {
			geometry = w + options
	  } else if (!w && h) {
      geometry = 'x' + h + options
		}

    // avoid error "geometry does not contain image (unable to crop image)" - gh-17
    if (!(this.inputIs('jpg') && ~this._out.indexOf('-crop'))) {
      this.in("-size",  geometry);
    }

    return this.out("-resize", geometry);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-scale
  proto.scale = function scale (w, h) {
    return this.out("-scale", w +"x"+ h);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-filter
  proto.filter = function filter (val) {
    return this.out("-filter", val);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-density
  proto.density = function density (w, h) {
    return this.out("-density", w +"x"+ h);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-profile
  proto.noProfile = function noProfile () {
    this.out('+profile', '"*"');
    return this;
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-resample
  proto.resample = function resample (w, h) {
    return this.out("-resample", w+"x"+h);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-rotate
  proto.rotate = function rotate (color, deg) {
    return this.out("-background", color, "-rotate", deg);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-flip
  proto.flip = function flip () {
    return this.out("-flip");
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-flop
  proto.flop = function flop () {
    return this.out("-flop");
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-crop
  proto.crop = function crop (w, h, x, y) {
    if (this.inputIs('jpg')) {
      // avoid error "geometry does not contain image (unable to crop image)" - gh-17
      var index = this._in.indexOf('-size');
      if (~index) {
        this._in.splice(index, 2);
      }
    }

    return this.out("-crop", w+"x"+h + "+"+(x||0)+"+"+(y||0));
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-chop
  proto.chop = function chop (w, h, x, y) {
    return this.in("-chop", w+"x"+h + "+"+(x||0)+"+"+(y||0));
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.magnify = function magnify (factor) {
    return this.in("-magnify", factor || 1);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.minify = function minify (factor) {
    return this.in("-minify", factor || 1);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-quality
  proto.quality = function quality (val) {
    return this.in("-quality", val || 75);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-blur
  proto.blur = function blur (radius, sigma) {
    return this.out("-blur", radius + (sigma ? "x"+sigma : ""));
  }

  // http://www.graphicsmagick.org/convert.html
  proto.charcoal = function charcoal (factor) {
    return this.out("-charcoal", factor || 2);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-colorize
  proto.colorize = function colorize (r, g, b) {
    return this.out("-colorize", [r,g,b].join(","));
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-modulate
  proto.modulate = function modulate (b, s, h) {
    return this.out("-modulate", [b,s,h].join(","));
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-antialias
  // note: antialiasing is enabled by default
  proto.antialias = function antialias (disable) {
    return false === disable
      ? this.out("+antialias")
      : this;
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-depth
  proto.bitdepth = function bitdepth (val) {
    return this.out("-depth", val);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-colors
  proto.colors = function colors (val) {
    return this.out("-colors", val || 128);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-colorspace
  proto.colorspace = function colorspace (val) {
    return this.out("-colorspace", val);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-comment
  proto.comment = comment("-comment");

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-contrast
  proto.contrast = function contrast (mult) {
    var arg = (parseInt(mult, 10) || 0) > 0
      ? "+contrast"
      : "-contrast";

    mult = Math.abs(mult) || 1;

    while (mult--) {
      this.out(arg);
    }

    return this;
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-cycle
  proto.cycle = function cycle (amount) {
    return this.out("-cycle", amount || 2);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.despeckle = function despeckle () {
    return this.out("-despeckle");
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-dither
  // note: either colors() or monochrome() must be used for this
  // to take effect.
  proto.dither = function dither (on) {
    var sign = false === on
      ? "+"
      : "-";

    return this.out(sign + "dither");
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.monochrome = function monochrome () {
    return this.out("-monochrome");
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.edge = function edge (radius) {
    return this.out("-edge", radius || 1);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.emboss = function emboss (radius) {
    return this.out("-emboss", radius || 1);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.enhance = function enhance () {
    return this.out("-enhance");
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.equalize = function equalize () {
    return this.out("-equalize");
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-gamma
  proto.gamma = function gamma (r, g, b) {
    return this.out("-gamma", [r,g,b].join());
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.implode = function implode (factor) {
    return this.out("-implode", factor || 1);
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

    return this.out("-limit", type, val);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html
  proto.median = function median (radius) {
    return this.out("-median", radius || 1);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-negate
  proto.negative = function negative (grayscale) {
    var sign = grayscale ? "+" : "-";
    return this.out(sign + "negate");
  }

  var noises = [
      "uniform"
    , "gaussian"
    , "multiplicative"
    , "impulse"
    , "laplacian"
    , "poisson"
  ];

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-noise
  proto.noise = function noise (radius) {
    radius = (String(radius)).toLowerCase();

    var sign = ~noises.indexOf(radius)
      ? "+"
      : "-";

    return this.out(sign + "noise", radius);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-paint
  proto.paint = function paint (radius) {
    return this.out("-paint", radius);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-raise
  proto.raise = function raise (w, h) {
    return this.out("-raise", (w||0)+"x"+(h||0));
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-raise
  proto.lower = function lower (w, h) {
    return this.out("+raise", (w||0)+"x"+(h||0));
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-region
  proto.region = function region (w, h, x, y) {
    w = w || 0;
    h = h || 0;
    x = x || 0;
    y = y || 0;
    return this.out("-region", w + "x" + h + "+" + x + "+" + y);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-roll
  proto.roll = function roll (x, y) {
    x = ((x = parseInt(x, 10) || 0) > 0 ? "+" : "") + x;
    y = ((y = parseInt(y, 10) || 0) > 0 ? "+" : "") + y;
    return this.out("-roll", x+y);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-sharpen
  proto.sharpen = function sharpen (radius, sigma) {
    sigma = sigma
      ? "x" + sigma
      : "";

    return this.out("-sharpen", radius + sigma);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-solarize
  proto.solarize = function solarize (factor) {
    return this.out("-solarize", (factor || 1)+"%");
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-spread
  proto.spread = function spread (amount) {
    return this.out("-spread", amount || 5);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-swirl
  proto.swirl = function swirl (degrees) {
    return this.out("-swirl", degrees || 180);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-type
  proto.type = function type (type) {
    return this.in("-type", type);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-trim
  proto.trim = function trim () {
    return this.out("-trim");
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-extent
  proto.extent = function extent (w, h, options) {
    options = options || "";
    var geometry;
    if (w && h) {
      geometry = w + "x" + h + options
    } else if (w && !h) {
      geometry = w + options
    } else if (!w && h) {
      geometry = 'x' + h + options
    }

    // avoid error "geometry does not contain image (unable to crop image)" - gh-17
    if (!(this.inputIs('jpg') && ~this._out.indexOf('-crop'))) {
      this.in("-size",  geometry);
    }

    return this.out("-extent", geometry);
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-gravity
  // Be sure to use gravity BEFORE extent
  proto.gravity = function gravity (type) {
    if (!type || !~gravity.types.indexOf(type)) {
      type = "NorthWest"; // Documented default.
    }

    return this.out("-gravity", type);
  }

  proto.gravity.types = [
      "NorthWest"
    , "North"
    , "NorthEast"
    , "West"
    , "Center"
    , "East"
    , "SouthWest"
    , "South"
    , "SouthEast"
  ];

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-flatten
  proto.flatten = function flatten () {
    return this.out("-flatten");
  }

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-background
  proto.background = function background (color) {
    return this.out("-background", color);
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

    return this.out(arg, '"' + format + '"');
  }
}
