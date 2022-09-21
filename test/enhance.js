const assert = require('assert')
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .enhance();

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-enhance', args[2]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'enhance.png');
  m.write(destPath, function enhance (err) {
    finish(err);
  });
}
