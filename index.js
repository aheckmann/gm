
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

function gm (source, height, color) {
  var width;

  if (!(this instanceof gm)) {
    return new gm(source, height, color);
  }

  this.data = {};
  this._in = [];
  this._out = [];

  if (height) {
    // new images
    width = source;
    source = "";

    var arg = ["-size", width + "x" + height];

    if (color) {
      arg = arg.concat(['"xc:'+ color + '"']);
    }

    this.arg(arg);
  } else {
    source = escape(source);
  }

  this.source = source;
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

