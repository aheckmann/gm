const assert = require('assert');
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .median(4);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-median', args[2]);
  assert.equal(4, args[3]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'median.png');
  m.write(destPath, function media (err) {
    finish(err);
  });
}
