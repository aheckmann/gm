const assert = require('assert');
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .resample(420, 120);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-resample', args[2]);
  assert.equal('420x120', args[3]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'resample.png');
  m.write(destPath, function resample (err) {
    finish(err);
  });
}
