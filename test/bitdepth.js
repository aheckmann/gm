
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .bitdepth(2);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-depth', args[2]);
  assert.equal(2, args[3]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/bitdepth.png', function bitdepth (err) {
    finish(err);
  });
}
