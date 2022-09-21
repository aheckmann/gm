const assert = require('assert')
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .interlace();

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-interlace', args[2]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'interlace.png');
  m.write(destPath, function interlace (err) {
    finish(err);
  });
}
