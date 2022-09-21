const assert = require('assert');
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .noise(0.3);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-noise', args[2]);
  assert.equal(0.3, args[3]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'noise1.png');
  m.write(destPath, function noise1 (err) {
    finish(err);
  });
}
