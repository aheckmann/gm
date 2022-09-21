const assert = require('assert');
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .flop();

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-flop', args[2]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'flop.png');
  m.write(destPath, function flop (err) {
    finish(err);
  });
}
