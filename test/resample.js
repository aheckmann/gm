
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .resample(420, 120);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-resample', args[2]);
  assert.equal('420x120', args[3]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/resample.png', function resample (err) {
    finish(err);
  });
}
