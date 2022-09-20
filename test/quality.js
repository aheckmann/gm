const assert = require('assert');
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .quality(5);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-quality', args[1]);
  assert.equal(5, args[2]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'quality.png');
  m.write(destPath, function quality (err) {
    finish(err);
  });
}
