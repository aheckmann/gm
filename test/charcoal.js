const assert = require('assert');
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .charcoal(1);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-charcoal', args[2]);
  assert.equal(1, args[3]);

  if (!GM.integration)
    return finish();

  const outpath = path.join(dir, 'charcoal.png');
  m.write(outpath, function charcoal (err) {
    finish(err);
  });
}
