const assert = require('assert');
const path = require('path');
const fs = require('fs')

module.exports = function (_, dir, finish, gm, imageMagick) {

  const original = path.join(dir, 'orientation', 'Portrait_7.jpg');
  const result = path.join(dir, 'resizeAutoOrientFromBuffer.png');

  var buf = fs.readFileSync(original);

  var m = gm(buf, 'resizefrombuffer.jpg')
  .options({imageMagick})
  .autoOrient()
  .resize('20%')

  const expectedArgs = imageMagick ?
    ['convert', '-', '-auto-orient', '-resize', '20%', '-'] :
    ['convert', '-', '-resize', '20%x', '-'];

  assert.deepEqual(m.args(), expectedArgs);

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
