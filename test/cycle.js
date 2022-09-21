const assert = require('assert')
const path = require('path');

module.exports = function (gm, dir, finish, GM) {
  const m = gm.cycle(4);

  const args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-cycle', args[2]);
  assert.equal(4, args[3]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'cycle.png');
  m.write(destPath, function cycle (err) {
    finish(err);
  });
}
