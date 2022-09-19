const assert = require('assert');
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .chop(54, 1, 307, 1);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-chop', args[1]);
  assert.equal('54x1+307+1', args[2]);

  if (!GM.integration)
    return finish();

  const outpath = path.join(dir, 'chop.png');
  m.write(outpath, function chop (err) {
    finish(err);
  });
}
