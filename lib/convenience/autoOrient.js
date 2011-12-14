
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

/**
 * Extend proto.
 */

module.exports = function (proto) {

  var exifTransforms = {
    topleft:     ''
  , topright:    ['-flip', 'horizontal']
  , bottomright: ['-rotate', 180]
  , bottomleft:  ['-flip', 'vertical' ]
  , lefttop:     ['-transpose']
  , righttop:    ['-rotate', 90]
  , rightbottom: ['-transverse']
  , leftbottom:  ['-rotate', 270]
  }

  proto.autoOrient = function autoOrient () {
    var self = this;
    self.preprocessor(function(callback) {
      self.orientation({bufferStream: true}, function (err, orientation) {
        if (err) return callback(err);

        var transforms = exifTransforms[orientation.toLowerCase()];
        if(transforms) {

          // remove any existing transforms that might conflict
          var index = self._out.indexOf(transforms[0]);
          if (~index) {
            self._out.splice(index, transforms.length);
          }

          // repage to fix coordinates and strip the EXIF
          // profile since we can't reset Orientation=1
          var adjustments = [];
          adjustments.push('-page', '+0+0');
          adjustments.push('+profile', '"*"');

          self._out.unshift.apply(self._out, transforms.concat(adjustments));

        }

        callback(self);
      });
    });

    return self;
  }
}
