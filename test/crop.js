const assert = require('assert')
const path = require('path');

module.exports = function (gm, dir, finish, GM, imageMagick) {
  const m = gm.crop(200, 155, 300, 0);

  const args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-crop', args[2]);
  assert.equal('200x155+300+0', args[3]);

  const imagePath = path.join(dir, 'image.png');
  const m2 = GM(imagePath).options({ imageMagick }).crop(200, 155, 300, 0, true);

  const args2 = m2.args();
  assert.equal('200x155+300+0%', args2[3]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'crop.png');
  m.write(destPath, function crop (err) {
    finish(err);
  });
}
