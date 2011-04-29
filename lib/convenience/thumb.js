
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

/**
 * Extend proto.
 */

module.exports = function (proto) {

  proto.thumb = function thumb (w, h, name, quality, callback) {
    var self = this
      , args = Array.prototype.slice.call(arguments);

    callback = args.pop();
    w = args.shift();
    h = args.shift();
    name = args.shift();
    quality = args.shift() || 63;

    self.size(function (err, size) {
      if (err) {
        return callback.apply(self, arguments);
      }

      w = parseInt(w, 10);
      h = parseInt(h, 10);

      var w1, h1;

      if (size.width < size.height) {
        w1 = w;
        h1 = Math.floor(size.height * (w/size.width));
        if (h1 < h) {
          w1 = Math.floor(w1 * (((h-h1)/h) + 1));
          h1 = h;
        }
      } else if (size.width > size.height) {
        h1 = h;
        w1 = Math.floor(size.width * (h/size.height));
        if (w1 < w) {
          h1 = Math.floor(h1 * (((w-w1)/w) + 1));
          w1 = w;
        }
      } else if (size.width == size.height) {
        w1 = w;
        h1 = h;
      }

      self
      .quality(quality)
      .in("-size", w1+"x"+h1)
      .scale(w1, h1)
      .crop(w, h)
      .noProfile()
      .write(name, function () {
        callback.apply(self, arguments)
      });
    });

    return self;
  }
}
