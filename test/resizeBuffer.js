var assert = require('assert')
var fs = require('fs')

module.exports = function (_, dir, finish, gm) {

  var original = dir + '/original.jpg';
  var result = dir + '/resizeFromBuffer.png';

  var buf = fs.readFileSync(original);

  var m = gm(buf, 'resizefrombuffer.jpg')
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

  size(original, function (err, origSize) {
    if (err) return finish(err);

    m
    .write(result, function resizeFromBuffer (err) {
      if (err) return finish(err);

      size(result, function (err, newSize) {
        if (err) return finish(err);
        assert.ok(origSize.width / 2 >= newSize.width);
        assert.ok(origSize.height / 2 >= newSize.height);
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
