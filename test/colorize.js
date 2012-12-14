
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .colorize(80, 0, 30)

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-colorize', args[2]);
  assert.equal('80,0,30', args[3]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/colorize.png', function colorize (err) {
    finish(err);
  });
}
