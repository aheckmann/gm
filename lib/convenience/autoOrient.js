
/**
 * Extend proto.
 */

module.exports = function (proto) {

  var exifTransforms = {
      topleft:     ''
    , topright:    ['-flop']
    , bottomright: ['-rotate', 180]
    , bottomleft:  ['-flip']
    , lefttop:     ['-flip', '-rotate', 90]
    , righttop:    ['-rotate', 90]
    , rightbottom: ['-flop', '-rotate', 90]
    , leftbottom:  ['-rotate', 270]
  }

  proto.autoOrient = function autoOrient () {
    // Always strip EXIF data since we can't
    // change/edit it.

    // imagemagick has a native -auto-orient option
    // so does graphicsmagick, but in 1.3.18.
    // apt doesn't release this version yet.
    if (this._options.imageMagick) {
      this.out('-auto-orient');
      this.strip();
      return this;
    }

    this.preprocessor(function (callback) {
      this.orientation({bufferStream: true}, function (err, orientation) {
        if (err) return callback(err);

        var transforms = exifTransforms[orientation.toLowerCase()];
        if (transforms) {

          // remove any existing transforms that might conflict
          var index = this._out.indexOf(transforms[0]);
          if (~index) {
            this._out.splice(index, transforms.length);
          }

          // repage to fix coordinates
          this._out.unshift.apply(this._out, transforms.concat('-page', '+0+0'));
        }

        this.strip();

        callback();
      });
    });

    return this;
  }
}
