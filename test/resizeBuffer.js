const assert = require('assert');
const path = require('path');
const fs = require('fs')

module.exports = function (_, dir, finish, gm, imageMagick) {

  var original = path.join(dir, 'original.jpg');
  var result = path.join(dir, 'resizeFromBuffer.png');

  var buf = fs.readFileSync(original);

  var m = gm(buf, 'resizefrombuffer.jpg')
  .options({imageMagick})
  .resize('48%')

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-', args[1]);
  assert.equal('-resize', args[2]);
  if (m._options.imageMagick) {
    assert.equal('48%', args[3]);
  } else {
    assert.equal('48%x', args[3]);
  }

  if (!gm.integration)
    return finish();

  size(original, imageMagick, function (err, origSize) {
    if (err) return finish(err);

    m
    .write(result, function resizeFromBuffer (err) {
      if (err) return finish(err);

      size(result, imageMagick, function (err, newSize) {
        if (err) return finish(err);
        assert.ok(origSize.width / 2 >= newSize.width);
        assert.ok(origSize.height / 2 >= newSize.height);
        finish();
      });
    });
  });


  function size (file, imageMagick, cb) {
    gm(file).options({imageMagick}).identify(function (err, data) {
      if (err) return cb(err);
      cb(err, data.size);
    });
  }
}
