const assert = require('assert')
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .scale(200, 100)
  .extent(300,300)

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-scale', args[2]);
  assert.equal('200x100', args[3]);
  assert.equal('-extent', args[4]);
  assert.equal('300x300', args[5]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'extent.png');
  m.write(destPath, function resize (err) {
    finish(err);
  });
}
