
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .resize(58, 50, '%');

  var args=  m.args();
  assert.equal('convert', args[0]);
  assert.equal('-size', args[1]); // TODO remove this from resize() method
  assert.equal('58x50%', args[2]);
  assert.equal('-resize', args[4]);
  assert.equal('58x50%', args[5]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/resize.png', function resize (err) {
    finish(err);
  });
}
