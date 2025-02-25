const assert = require('assert');
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .region(130, 170, 307, 00);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-region', args[2]);
  assert.equal('130x170+307+0', args[3]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'region.png');
  m.write(destPath, function region (err) {
    finish(err);
  });
}
