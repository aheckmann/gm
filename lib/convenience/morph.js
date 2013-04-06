/**
 * Extend proto.
 */

module.exports = function (proto) {

  /**
   * Do nothing.
   */

  function noop () {}

  // http://www.graphicsmagick.org/GraphicsMagick.html#details-morph
  proto.morph = function morph (other, outname, callback) {
    if (!callback) callback = noop;

    if (!outname) {
      throw new Error("an output filename is required");
    }

    this.out(other, "-morph", 1);

    this.write(outname, callback.bind(this));

    return this;
  }
}
