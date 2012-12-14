
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .crop(200, 155, 300, 0);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-crop', args[2]);
  assert.equal('200x155+300+0', args[3]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/crop.png', function crop (err) {
    finish(err);
  });
}
