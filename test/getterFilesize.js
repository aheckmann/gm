
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {
  if (!GM.integration)
    return finish();

  gm
  .filesize(function getterfilesize (err, size) {
    if (err) return finish(err);

    if (this._options.imageMagick) {
      assert.equal('7.79KB', size, size);
    } else {
      assert.ok(/7.6K[i]{0,1}/.test(size));
    }

    assert.equal(size, this.data.Filesize)

    // make sure we are reading from the data cache and not
    // hitting the fs again.
    this.identify = function () {
      assert.ok(false, 'Did not read from cache');
    }

    this.filesize(function (err, size) {
      if (err) return finish(err);

      if (this._options.imageMagick) {
        assert.equal('7.79KB', size, size);
      } else {
        assert.ok(/7.6K[i]{0,1}/.test(size));
      }

      assert.equal(size, this.data.Filesize)
      finish();
    });

  });
}
