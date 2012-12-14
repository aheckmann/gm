
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .sepia();

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-modulate', args[2]);
  assert.equal('115,0,100', args[3]);
  assert.equal('-colorize', args[4]);
  assert.equal('7,21,50', args[5]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/sepia.png', function sepia (err) {
    finish(err);
  });
}
