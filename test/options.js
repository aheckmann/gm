const assert = require('assert');
const path = require('path');
const fs = require('fs');

const checkCmd = (cmd, imageMagick) => {
  switch (imageMagick) {
    case true:
      assert.ok(/^convert /.test(cmd));
      break;
    case '7+':
      assert.ok(/^magick "convert" /.test(cmd));
      break;
    default:
      assert.ok(/^gm "convert" /.test(cmd));
      break;
  }
}

module.exports = function (_, dir, finish, gm, imageMagick) {

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

  if (!gm.integration)
    return finish();

  // test commands
  // test with subclass

  const photoPath = path.join(dir, 'photo.JPG');
  const writeFile = path.join(dir, `options${Math.random()}.png`);
  const instance = gm.subClass({ imageMagick });

  instance(photoPath)
  .negative()
  .write(writeFile, function (err, _1, _2, cmd) {
    if (err) return finish(err);

    checkCmd(cmd, imageMagick);

    fs.stat(writeFile, function (err) {
      if (err) return finish(new Error('did not write file'));

      try {
        fs.unlinkSync(writeFile);
      } catch (e) {}

      /// inline options
      gm(photoPath)
      .negative()
      .options({ imageMagick })
      .write(writeFile, function (err, _1, _2, cmd) {
        if (err) return finish(err);

        checkCmd(cmd, imageMagick);

        fs.stat(writeFile, function (err) {
          if (err) return finish(new Error('did not write 2nd file'));
          try {
            fs.unlinkSync(writeFile);
          } catch (e) {}
          finish();
        });
      });
    });
  });
}
