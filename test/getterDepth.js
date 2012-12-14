
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {
  if (!GM.integration)
    return finish();

  gm
  .depth(function getterdepth (err, depth) {
    if (err) return finish(err);
    if (this._options.imageMagick) {
      assert.equal(16, depth);
      assert.equal(16, this.data.depth);
    } else {
      assert.equal(8, depth);
      assert.equal(8, this.data.depth);
    }
    finish();
  });
}
