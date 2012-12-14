
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .monochrome();

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-monochrome', args[2]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/monochrome.png', function monochrome (err) {
    finish(err);
  });
}
