
/**
 * Module dependencies.
 */

var fs = require('fs');

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
    if (!outname) {
      throw new Error("an output filename is required");
    }

    callback = (callback || noop).bind(this)

    var self = this;

    self.out(other, "-morph", 1);

    self.write(outname, function (err, stdout, stderr, cmd) {
      if (err) return callback(err, stdout, stderr, cmd);

      // Apparently some platforms create the following temporary files.
      // Check if the output file exists, if it doesn't, then
      // work with temporary files.
      fs.exists(outname, function (exists) {
        if (exists) return callback(err, stdout, stderr, cmd);

        var remaining = 3;

        fs.unlink(outname + ".0", next);
        fs.unlink(outname + ".2", next);
        fs.rename(outname + ".1", outname, next);

        function next (err) {
          if (next.err) return;

          if (err) {
            next.err = err;
            return callback(err, stdout, stderr, cmd);
          }

          if (--remaining) return;

          callback(err, stdout, stderr, cmd);
        }
      })
    });

    return self;
  }
}
