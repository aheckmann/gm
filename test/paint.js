const assert = require('assert');
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .paint(2);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-paint', args[2]);
  assert.equal(2, args[3]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'paint.png');
  m.write(destPath, function paint (err) {
    finish(err);
  });
}
