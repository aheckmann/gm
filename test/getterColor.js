
var assert = require('assert')

module.exports = function (_, dir, finish, gm) {
  if (!gm.integration)
    return finish();

  gm(dir + '/blue.gif').color(function (err, color) {
    if (err) return finish(err);

    assert.equal(1, color)
    assert.equal(this.data.color, color)

    finish();

  });
}
