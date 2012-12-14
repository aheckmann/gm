
var assert =require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .gamma(1.7, 2.3, 1.3);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-gamma', args[2]);
  assert.equal('1.7,2.3,1.3', args[3]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/gamma.png', function gamma (err) {
    finish(err);
  });
}
