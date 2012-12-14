
var assert =require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .flop();

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-flop', args[2]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/flop.png', function flop (err) {
    finish(err);
  });
}
