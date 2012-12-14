
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .paint(2);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-paint', args[2]);
  assert.equal(2, args[3]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/paint.png', function paint (err) {
    finish(err);
  });
}
