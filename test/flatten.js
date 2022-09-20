const assert = require('assert');
const path = require('path');

module.exports = function (_, dir, finish, gm, imageMagick) {
  // graphicsmagick considers PSD broken
  // http://www.graphicsmagick.org/NEWS.html#may-30-2016
  if (!imageMagick) {
    return finish();
  }

  const layersPath = path.join(dir, 'layers.psd');
  var m = gm(layersPath)
  .options({ imageMagick })
  .flatten();

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-flatten', args[2]);

  if (!gm.integration)
    return finish();

  const destPath = path.join(dir, 'unlayered.jpg');
  m.write(destPath, function (err) {
    finish(err);
  });
}
