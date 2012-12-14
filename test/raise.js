
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .raise(10,14);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-raise', args[2]);
  assert.equal('10x14', args[3]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/raise.png', function raise (err) {
    finish(err);
  });
}
