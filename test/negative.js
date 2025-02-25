const assert = require('assert');
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m = GM('temp.jpg').negative(true);
  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('+negate', args[2]);

  m = gm.negative();
  args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-negate', args[2]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'negative.png');
  m.write(destPath, function negative (err) {
    finish(err);
  });
}
