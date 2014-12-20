
/**
 * Extend proto.
 */

module.exports = function (proto) {

  proto.thumb = function thumb (w, h, name, quality, align, callback) {
    var self = this
      , args = Array.prototype.slice.call(arguments);

    callback = args.pop();
    w = args.shift();
    h = args.shift();
    name = args.shift();
    quality = args.shift() || 63;
    align = args.shift() || 'topleft';

    self.size(function (err, size) {
      if (err) {
        return callback.apply(self, arguments);
      }

      var w1 = w = parseInt(w, 10);
      var h1 = h = parseInt(h, 10);

      var xoffset = 0;
      var yoffset = 0;
      var xratio = w / size.width;
      var yratio = h / size.height;

      if (xratio > yratio) {
        h1 = Math.ceil(xratio * size.height);
      } else {
        w1 = Math.ceil(yratio * size.width);
      }

      if (align === 'center') {
        xoffset = Math.floor((w1 - w) / 2);
        yoffset = Math.floor((h1 - h) / 2);
      }

      self
        .quality(quality)
        .scale(w1, h1)
        .crop(w, h, xoffset, yoffset)
        .noProfile()
        .write(name, function () {
          callback.apply(self, arguments)
        });
    });

    return self;
  }
}
