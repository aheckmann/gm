const assert = require('assert');
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .colors(16);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-colors', args[2]);
  assert.equal(16, args[3]);

  if (!GM.integration)
    return finish();

  const outpath = path.join(dir, 'colors.png');
  m.write(outpath, function colors (err) {
    finish(err);
  });
}
