const assert = require('assert');
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .raise(10,14);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-raise', args[2]);
  assert.equal('10x14', args[3]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'raise.png');
  m.write(destPath, function raise (err) {
    finish(err);
  });
}
