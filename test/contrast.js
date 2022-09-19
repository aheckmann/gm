const assert = require('assert')
const path = require('path');

module.exports = function (gm, dir, finish, GM) {
  const m = gm.contrast(2);

  const args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('+contrast', args[2]);
  assert.equal('+contrast', args[3]);

  if (!GM.integration) return finish();

  const destPath = path.join(dir, 'contrast.png');

  m.write(destPath, function contrast (err) {
    finish(err);
  });
}
