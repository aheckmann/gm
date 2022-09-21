const assert = require('assert');
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  if (!gm._options.imageMagick) return finish();

  var m = gm
  .strip();

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-strip', args[2]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'strip.png');
  m.write(destPath, function strip (err) {
    finish(err);
  });
}
