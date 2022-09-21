const assert = require('assert')
const path = require('path');

module.exports = function (gm, dir, finish, GM) {
  if (gm._options.imageMagick)
    return finish();

  var g = gm.monochrome().dither();

  var args = g.args();
  assert.equal('convert', args[0]);
  assert.equal('-monochrome', args[2]);
  assert.equal('-dither', args[3]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'dither.png');
  g.write(destPath, function dither (err) {
    finish(err);
  });
}
