
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .median(4);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-median', args[2]);
  assert.equal(4, args[3]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/median.png', function media (err) {
    finish(err);
  });
}
