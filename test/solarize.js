
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .solarize(68.5);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-solarize', args[2]);
  assert.equal('68.5%', args[3]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/solarize.png', function solarize (err) {
    finish(err);
  });
}
