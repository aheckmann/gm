const assert = require('assert');
const path = require('path');

module.exports = function (_, dir, finish, gm, imageMagick) {
  const gifPath = path.join(dir, 'original.gif[0]');
  var m = gm(gifPath);

  if (!gm.integration)
    return finish();

  m.options({imageMagick}).identify('%#', function (err, hash1) {
    if (err) return finish(err);

    m.selectFrame(2).identify('%#', function (err, hash2) {
      if (err) return finish(err);

      assert.ok(hash1.toString().trim() !== hash2.toString().trim())
      finish();
    })
  })
}