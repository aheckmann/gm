
var assert =require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = GM('temp.jpg').negative(true);
  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('+negate', args[2]);

  m = gm.negative();
  args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-negate', args[2]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/negative.png', function negative (err) {
    finish(err);
  });
}
