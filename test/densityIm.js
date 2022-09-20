const assert = require('assert')
const path = require('path');

module.exports = function (gm, dir, finish, GM) {
  const isImageMagickTest = !!gm._options.imageMagick;

  var NUMBER = 100;
  var im = gm.options({imageMagick: true}).density(NUMBER);

  var imArgs = im.args();
  assert.equal('convert', imArgs[0]);
  assert.equal('-density', imArgs[1]);
  assert.equal(NUMBER, imArgs[2]);

  if (isImageMagickTest) return finish();
  if (!GM.integration) return finish();

  const destPath = path.join(dir, 'density.png');
  im.write(destPath, function density (err) {
    finish(err);
  });
};
