
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .quality(5);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-quality', args[1]);
  assert.equal(5, args[2]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/quality.png', function quality (err) {
    finish(err);
  });
}
