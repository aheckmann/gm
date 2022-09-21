const assert = require('assert');
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .sepia();

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-modulate', args[2]);
  assert.equal('115,0,100', args[3]);
  assert.equal('-colorize', args[4]);
  assert.equal('7,21,50', args[5]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'sepia.png');
  m.write(destPath, function sepia (err) {
    finish(err);
  });
}
