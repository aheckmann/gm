const assert = require('assert');
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .roll(40,-100);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-roll', args[2]);
  assert.equal('+40-100', args[3]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'roll.png');
  m.write(destPath, function roll (err) {
    finish(err);
  });
}
