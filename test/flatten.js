var assert = require('assert')

module.exports = function (img, dir, finish, gm) {
  var changed = gm('whatever.png').gravity("Souths")
  assert.equal(changed._out[1], 'NorthWest');

  var m = gm(dir + '/layers.psd')
  .flatten();

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-flatten', args[2]);

  if (!gm.integration)
    return finish();

  m
  .write(dir + '/unlayered.jpg', function (err) {
    finish(err);
  });
}
