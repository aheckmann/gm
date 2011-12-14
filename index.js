
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

/**
 * Module dependencies.
 */

var Stream = require('stream').Stream;

/**
 * Constructor.
 *
 * @param {String|Number} path - path to img source or ReadableStream or width of img to create
 * @param {Number} [height] - optional filename of ReadableStream or height of img to create
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

  if (source instanceof Stream) {
    this.sourceStream = source;
    source = height || 'unknown.jpg';
  } else if (height) {
    // new images
    width = source;
    source = "";

    this.in("-size", width + "x" + height);

    if (color) {
      this.in("xc:"+ color);
    }

  }

  // parse out gif frame brackets from filename
  // since stream doesn't use source path
  // eg. "filename.gif[0]"
  var frames;
  if (frames = source.match(/(\[.+\])$/)) {
    this.sourceFrames = source.substr(frames.index, frames[0].length);
    source = source.substr(0, frames.index);
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
module.exports.version = "0.5.0";

