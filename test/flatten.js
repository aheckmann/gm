var assert = require('assert')

module.exports = function (img, dir, finish, gm) {
  var changed = gm('whatever.png').gravity("Souths")
  assert.equal(changed._out[1], 'NorthWest');

  gm(dir + '/layers.psd')
  .flatten()
  .write(dir + '/unlayered.jpg', function (err) {
    finish(err);
  });
}
