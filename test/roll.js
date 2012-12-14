
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .roll(40,-100);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-roll', args[2]);
  assert.equal('+40-100', args[3]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/roll.png', function roll (err) {
    finish(err);
  });
}
