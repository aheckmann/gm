const assert = require('assert');
const path = require('path');

module.exports = function (gm, dir, finish, GM) {
  if (gm._options.imageMagick) return finish();

  var m = gm
  .minify();

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-minify', args[1]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'minify.png');
  m.write(destPath, function minify (err) {
    finish(err);
  });
}
