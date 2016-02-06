
var assert = require('assert');

module.exports = function (_, dir, finish, gm) {
  if (!gm.integration)
    return finish();

  sizeJPEG(function (err) {
    if (err) return finish(err);

    sizeGIF(function (err) {
      if (err) return finish(err);

      sizePNG(function (err) {
        if (err) return finish(err);

        sizeSVG(finish);
      });
    });
  });

  function sizeJPEG(done) {
    gm(dir + '/original.jpg')
    .size(function gettersize (err, size) {
      if (err) return done(err);

      assert.equal(size.width, 460);
      assert.equal(size.height, 155);

      gm(dir + '/identifyParseErr.jpg').size(done);
    });
  }

  function sizeGIF(done) {
    gm(dir + '/original.gif')
    .size(function (err, size) {
      if (err) return done(err);

      assert.equal(size.width, 192);
      assert.equal(size.height, 56);

      done();
    });
  }

  function sizePNG(done) {
    gm(dir + '/original.png')
    .size(function (err, size) {
      if (err) return done(err);

      assert.equal(size.width, 460);
      assert.equal(size.height, 155);

      done();
    });
  }

  function sizeSVG(done) {
    gm(dir + '/original.svg')
    .size(function (err, size) {
      if (err) return done(err);

      assert.equal(size.width, 216);
      assert.equal(size.height, 216);

      done();
    });
  }
}
