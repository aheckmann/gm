
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .emboss(2);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-emboss', args[2]);
  assert.equal(2, args[3]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/emboss.png', function emboss (err) {
    finish(err);
  });
}
