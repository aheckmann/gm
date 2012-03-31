var assert = require('assert')

module.exports = function (img, dir, finish, gm) {
  var changed = gm('whatever.png').gravity("Souths")
  assert.equal(changed._out[1], 'NorthWest');

  img
  .scale(200, 100)
  .gravity("South")
  .extent(300,300)
  .write(dir + '/gravity.png', function resize (err) {
    finish(err);
  });
}
