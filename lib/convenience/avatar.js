var fs = require("fs");

module.exports = function (proto) {

  proto.avatar = function avatar (name, callback) {
    var self = this;

    self.size(function (err, size) {
      if (err) {
        return callback.apply(self, arguments);
      }

      self.original = self.source;
      self.source = '';


      self
      .in("-size", size.width + "x" + size.height)
      .in("xc:#ffffff00")
      .drawCircle(size.width / 2, size.height / 2, size.width / 6, size.height / 6)
      .write('mask.png', function(err)
      {
        if (err) {
          return callback.apply(self, arguments);
        }

        self
        .subCommand("composite")
        .in('-compose', 'In', self.original, 'mask.png')
        .write(name, function(err)
        {
          fs.unlink("mask.png");
          if (err) {
            return callback.apply(self, arguments);
          }
          callback.apply(self, arguments);
        });
      });
    });

    return self;
  };
};
