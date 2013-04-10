
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

          // repage to fix coordinates and strip the EXIF
          // profile since we can't reset Orientation=1
          var adjustments = [];
          adjustments.push('-page', '+0+0');
          adjustments.push('+profile', '"*"');

          this._out.unshift.apply(this._out, transforms.concat(adjustments));
        }

        callback();
      });
    });

    return this;
  }
}
