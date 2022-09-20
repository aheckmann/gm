const assert = require('assert');
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .sharpen(19, 10);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-sharpen', args[2]);
  assert.equal('19x10', args[3]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'sharpen.png');
  m.write(destPath, function sharpen (err) {
    finish(err);
  });
}
