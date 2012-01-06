
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

var assert = require('assert')

module.exports = function (gm, dir, finish) {

  gm
  .depth(function getterdepth (err, depth) {
    if (err) return finish(err);
    assert.equal(8, depth);
    assert.equal('8 bits-per-pixel component', this.data.Depth);
    finish();
  });
}
