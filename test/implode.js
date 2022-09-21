const assert = require('assert')
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .implode(0.8);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-implode', args[2]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'implode.png');
  m.write(destPath, function implode (err) {
    finish(err);
  });
}
