
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .blur(18, 10);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-blur', args[2]);
  assert.equal('18x10', args[3]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/blur.png', function blur (err) {
    finish(err);
  });
}
