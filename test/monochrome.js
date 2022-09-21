const assert = require('assert');
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .monochrome();

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-monochrome', args[2]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'monochrome.png');
  m.write(destPath, function monochrome (err) {
    finish(err);
  });
}
