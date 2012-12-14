
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .noise(0.3);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-noise', args[2]);
  assert.equal(0.3, args[3]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/noise1.png', function noise1 (err) {
    finish(err);
  });
}
