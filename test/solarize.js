const assert = require('assert');
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .solarize(68.5);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-solarize', args[2]);
  assert.equal('68.5%', args[3]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'solarize.png');
  m.write(destPath, function solarize (err) {
    finish(err);
  });
}
