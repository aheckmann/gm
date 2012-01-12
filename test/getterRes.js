
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

var assert = require('assert')

module.exports = function (gm, dir, finish) {

  gm
  .res(function getterres (err, res) {
    if (err) return finish(err);
    assert.equal(res, this.data.Resolution)
    finish();
  });
}
