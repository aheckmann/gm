const assert = require('assert');
const path = require('path');
const fs = require('fs');

module.exports = function (_, dir, finish, gm) {

  var sub = gm.subClass({ subclassed: true });
  var s = sub('test').options({ setWithMethod: 2 });
  var g = gm('test').options({ hellowwww: 'there' });

  assert.equal(2, s._options.setWithMethod);
  assert.equal(true, s._options.subclassed);
  assert.equal('there', g._options.hellowwww);
  assert.equal(undefined, g._options.setWithMethod);
  assert.equal(undefined, s._options.hellowwww);
  assert.equal(undefined, g._options.subclassed);

  /// subclass options
  var s2 = sub('another');
  assert.equal(true, s2._options.subclassed);
  assert.equal(undefined, s2._options.setWithMethod);

  const writeFile = path.join(dir, `IM-negative${Math.random()}.png`);
  const imageMagick = gm.subClass({ imageMagick: true });

  if (!gm.integration)
    return finish();

  const photoPath = path.join(dir, 'photo.JPG');
  imageMagick(photoPath)
  .negative()
  .write(writeFile, function (err, _1, _2, cmd) {
    if (err) return finish(err);

    assert.ok(/^convert /.test(cmd));

    fs.stat(writeFile, function (err) {
      if (err) return finish(new Error('imagemagick did not write file'));
      try {
        fs.unlinkSync(writeFile);
      } catch (e) {}

      /// inline options
      gm(photoPath)
      .negative()
      .options({ imageMagick: true })
      .write(writeFile, function (err, _1, _2, cmd) {
        if (err) return finish(err);

        assert.ok(/^convert /.test(cmd));

        fs.stat(writeFile, function (err) {
          if (err) return finish(new Error('imagemagick did not write file'));
          try {
            fs.unlinkSync(writeFile);
          } catch (e) {}
          finish();
        });
      });
    });
  });
}
