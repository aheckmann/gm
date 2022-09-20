const assert = require('assert')
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .emboss(2);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-emboss', args[2]);
  assert.equal(2, args[3]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'emboss.png');
  m.write(destPath, function emboss (err) {
    finish(err);
  });
}
