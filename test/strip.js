
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  if (!gm._options.imageMagick) return finish();

  var m = gm
  .strip();

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-strip', args[2]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/edge.png', function edge (err) {
    finish(err);
  });
}
