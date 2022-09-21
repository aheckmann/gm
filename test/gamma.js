const assert = require('assert');
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .gamma(1.7, 2.3, 1.3);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-gamma', args[2]);
  assert.equal('1.7,2.3,1.3', args[3]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'gamma.png');
  m.write(destPath, function gamma (err) {
    finish(err);
  });
}
