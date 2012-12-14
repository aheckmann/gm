
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .despeckle();

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-despeckle', args[2]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/despeckle.png', function despeckle (err) {
    finish(err);
  });
}
