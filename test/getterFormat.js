
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

var assert = require('assert');

module.exports = function (gm, dir, finish) {

  gm
  .format(function getterformat (err, format) {
    if (err) return finish(err);

    assert.equal(format, 'JPEG');
    assert.equal(this.data.Format, 'JPEG (Joint Photographic Experts Group JFIF format)');

    finish();
  });
}
