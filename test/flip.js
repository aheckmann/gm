const assert = require('assert');
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .flip();

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-flip', args[2]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'flip.png');
  m.write(destPath, function flip (err) {
    finish(err);
  });
}
