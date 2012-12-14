
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .flip();

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-flip', args[2]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/flip.png', function flip (err) {
    finish(err);
  });
}
