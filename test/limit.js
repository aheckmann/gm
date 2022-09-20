const assert = require('assert');
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .limit("memory", "32MB")
  .limit("map", "64MB")

  var args = m.args()
  assert.equal('convert', args[0]);
  assert.equal('-limit', args[2]);
  assert.equal('memory', args[3]);
  assert.equal('32MB', args[4]);
  assert.equal('-limit', args[5]);
  assert.equal('map', args[6]);
  assert.equal('64MB', args[7]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'limit.png');
  m.write(destPath, function limit (err) {
    finish(err);
  });
}
