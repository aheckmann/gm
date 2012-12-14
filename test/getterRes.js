
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {
  if (!GM.integration)
    return finish();

  gm
  .res(function getterres (err, res) {
    if (err) return finish(err);
    if (gm._options.imageMagick) {
      assert.equal('72x72', res);
    } else {
      assert.equal('72x72 pixels/inch', res);
    }
    assert.equal(res, this.data.Resolution)
    finish();
  });
}
