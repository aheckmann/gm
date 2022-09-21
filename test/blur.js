
const assert = require('assert');
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .blur(18, 10);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-blur', args[2]);
  assert.equal('18x10', args[3]);

  if (!GM.integration)
    return finish();

  const outpath = path.join(dir, 'blur.png');
  m.write(outpath, function blur (err) {
    finish(err);
  });
}
