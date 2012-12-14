
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .equalize();

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-equalize', args[2]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/equalize.png', function equalize (err) {
    finish(err);
  });
}
