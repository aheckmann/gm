var assert = require('assert')
var fs = require('fs')

module.exports = function (_, dir, finish, gm) {
  if (!gm.integration)
    return finish();

  var original = dir + '/original.png';
  var resized = dir + '/resize';
  var widths = [600, 700, 400, 800], i, cb;

  var resize = function (width, resized, cb) {
    console.log('resized', resized);
    console.log('width', width);
    gm(original)
      .resize(width)
      .write(resized, function(err){
        if (err) return finish(err);

        gm(resized)
          .size(function (err, size) {
            if (err) return finish(err);
            if (size.width !== width) return finish("Wrong resizing on requested:" + width + ", resized:" + size.width);

            if (cb) cb();
            else finish();
          });
      });
  };

  for (i = 0; i < widths.length; i++) {
    if (i < widths.length - 2) {
      cb = function () {
        resize(widths[i + 1]);
      };
    } else {
      cb = null;
    }

    resize(widths[i], resized + i + '.png', cb);
  };
}