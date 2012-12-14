
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .enhance();

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-enhance', args[2]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/enhance.png', function enhance (err) {
    finish(err);
  });
}
