
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .chop(54, 1, 307, 1);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-chop', args[1]);
  assert.equal('54x1+307+1', args[2]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/chop.png', function chop (err) {
    finish(err);
  });
}
