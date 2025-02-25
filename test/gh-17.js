const assert = require('assert');
const path = require('path');

module.exports = function (gm, dir, finish, GM) {
  var m = gm
  .crop(200, 155, 300, 0)
  .resize(58, 50, '%');

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-crop', args[2]);
  assert.equal('200x155+300+0', args[3]);
  assert.equal('-resize', args[4]);
  assert.equal('58x50%', args[5]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'cropresize.png');
  m.write(destPath, function crop (err) {
    finish(err);
  });
}
