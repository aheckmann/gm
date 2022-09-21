const assert = require('assert');
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .spread(12);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-spread', args[2]);
  assert.equal(12, args[3]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'spread.png');
  m.write(destPath, function spread (err) {
    finish(err);
  });
}
