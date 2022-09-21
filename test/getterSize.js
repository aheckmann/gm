const assert = require('assert');
const path = require('path');

module.exports = function (_, dir, finish, gm, imageMagick) {
  if (!gm.integration)
    return finish();

  sizeJPEG(function (err) {
    if (err) return finish(err);

    sizeGIF(function (err) {
      if (err) return finish(err);

      sizePNG(finish);
    })
  })

  function sizeJPEG(done) {
    const originalPath = path.join(dir, 'original.jpg');
    gm(originalPath).options({imageMagick}).size(function gettersize (err, size) {
      if (err) return done(err);

      assert.equal(size.width, 460);
      assert.equal(size.height, 155);

      const identifyParseErrPath = path.join(dir, 'identifyParseErr.jpg');
      gm(identifyParseErrPath).options({imageMagick}).size(done);
    });
  }

  function sizeGIF(done) {
    const originalGifPath = path.join(dir, 'original.gif');
    gm(originalGifPath).options({imageMagick}).size(function (err, size) {
      if (err) return done(err);

      assert.equal(size.width, 192)
      assert.equal(size.height, 56)

      done()
    })
  }

  function sizePNG(done) {
    const originalPngPath = path.join(dir, 'original.png');
    gm(originalPngPath).options({imageMagick}).size(function (err, size) {
      if (err) return done(err);

      assert.equal(size.width, 460)
      assert.equal(size.height, 155)

      done()
    })
  }
}
