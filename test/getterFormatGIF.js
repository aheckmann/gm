
var assert = require('assert');

module.exports = function (_, dir, finish, gm) {
  if (!gm.integration)
    return finish();

  gm(dir + '/original.gif')
  .format(function (err, type) {
    if (err) return finish(err);

    assert.equal(type, 'GIF');
    assert.equal(this.data.format, 'GIF');

    finish();
  })
}
