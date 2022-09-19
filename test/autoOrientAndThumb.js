const assert = require('assert')
const path = require('path');

module.exports = function (_, dir, finish, gm) {
  if (!gm.integration)
    return finish();

  var original = path.join(dir, 'orientation', 'Portrait_7.jpg');
  var result = path.join(dir, 'autoOrientAndThumb.png');

  size(original, function (err, origSize) {
    if (err) return finish(err);

    assert.ok(origSize.width < 610);
    assert.ok(origSize.height < 460);

    var m = gm(original)
    .autoOrient()
    .thumb(100, 100, result, function (err) {
      if (err) return finish(err);

      size(result, function (err, newSize) {
        if (err) return finish(err);
        assert.ok(newSize.width < 80);
        assert.ok(newSize.height < 110);
        finish();
      });

    });
  });

  function size (file, cb) {
    gm(file).identify(function (err, data) {
      if (err) return cb(err);
      cb(err, data.size);
    });
  }
}
