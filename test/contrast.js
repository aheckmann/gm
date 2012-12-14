
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .contrast(2);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('+contrast', args[2]);
  assert.equal('+contrast', args[3]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/contrast.png', function contrast (err) {
    finish(err);
  });
}
