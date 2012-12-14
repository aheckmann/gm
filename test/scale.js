
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .scale(100, 100);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-scale', args[2]);
  assert.equal('100x100', args[3]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/scale.png', function scale (err) {
    finish(err);
  });
}
