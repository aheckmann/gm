
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

var assert = require('assert')

module.exports = function (gm, dir, finish) {

  gm
  .filesize(function getterfilesize (err, size) {
    if (err) return finish(err);

    if (this._options.imageMagick) {
      assert.ok(/7.79KB/.test(size));
    } else {
      assert.equal(size, '7.6K');
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
        assert.ok(/7.79KB/.test(size));
      } else {
        assert.equal(size, '7.6K');
      }

      assert.equal(size, this.data.Filesize)
      finish();
    });

  });
}
