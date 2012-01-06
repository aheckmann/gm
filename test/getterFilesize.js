
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

var assert = require('assert')

module.exports = function (gm, dir, finish) {

  gm
  .filesize(function getterfilesize (err, size) {
    if (err) return finish(err);
    assert.ok(size === this.data.Filesize, this.data.filesize)
    finish();
  });
}
