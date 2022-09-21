const assert = require('assert')
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .equalize();

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-equalize', args[2]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'equalize.png');
  m.write(destPath, function equalize (err) {
    finish(err);
  });
}
