
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

/**
 * Module dependencies.
 */

var escape = require('./lib/utils').escape;

/**
 * Constructor.
 *
 * @param {String|Number} path - path to img source or width of img to create
 * @param {Number} [height] - optional height of img to create
 * @param {String} [color] - optional hex background color of created img
 */

function gm (source, height, color, useImageMagick) {
  var width;

  if (!(this instanceof gm)) {
    return new gm(source, height, color, useImageMagick);
  }

  this.data = {};
  this._in = [];
  this._out = [];

  if (parseInt(height, 10) != 0 || height == "0") {
    // new images
    width = source;
    source = "";

    this.in("-size", width + "x" + height);

    if (typeof(color) != "boolean") {
      this.in("xc:"+ color);
	  useImageMagick = (useImageMagick);
    } else {
      useImageMagick = (color);
	}
  } else {
    source = escape(source);
	useImageMagick = (height);
  }

  this.source = source;
  this.useImageMagick = useImageMagick;
}

/**
 * Augment the prototype.
 */

require("./lib/getters")(gm.prototype);
require("./lib/args")(gm.prototype);
require("./lib/drawing")(gm.prototype);
require("./lib/convenience")(gm.prototype);
require("./lib/command")(gm.prototype);

/**
 * Expose.
 */

module.exports = gm;
module.exports.version = "0.5.0";

