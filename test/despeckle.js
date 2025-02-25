const assert = require('assert')
const path = require('path');

module.exports = function (gm, dir, finish, GM) {
  var m = gm.despeckle();

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-despeckle', args[2]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'despeckle.png');
  m.write(destPath, function despeckle (err) {
    finish(err);
  });
}
