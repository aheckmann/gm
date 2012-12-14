
var assert =require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .modulate(120, 100, 80);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-modulate', args[2]);
  assert.equal('120,100,80', args[3]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/modulate.png', function modulate (err) {
    finish(err);
  });
}
