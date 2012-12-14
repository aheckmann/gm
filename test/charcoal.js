
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .charcoal(1);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-charcoal', args[2]);
  assert.equal(1, args[3]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/charcoal.png', function charcoal (err) {
    finish(err);
  });
}
