
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
    self.preProcess(function(callback) {
      self.orientation(function (err, orientation) {
        if (err) return callback(err);

        var transforms = exifTransforms[orientation.toLowerCase()];
        if(transforms) {

          // remove any existing transforms that might conflict
          var index = self._out.indexOf(transforms[0]);
          if (~index) {
            self._out.splice(index, transforms.length);
          }

          self.out.apply(self, transforms);

          // strip EXIF profile since we can't reset Orientation=1
          self.noProfile();
        }

        callback(self);
      });
    });

    return self;
  }
}
