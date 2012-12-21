var assert = require('assert')
var fs = require('fs')

module.exports = function (_, dir, finish, gm) {

  var original = dir + '/orientation/Portrait_7.jpg';
  var result = dir + '/resizeAutoOrientFromBuffer.png';

  var buf = fs.readFileSync(original);

  var m = gm(buf, 'resizefrombuffer.jpg')
  .autoOrient()
  .resize('20%')

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-', args[1]);
  assert.equal('-resize', args[2]);
  assert.equal('20%', args[3]);

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
    gm(file).identify(result, function (err, data) {
      if (err) return cb(err);
      cb(err, data.size);
    });
  }
}
