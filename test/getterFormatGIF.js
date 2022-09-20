const assert = require('assert');
const path = require('path');

module.exports = function (_, dir, finish, gm) {
  if (!gm.integration)
    return finish();

  const destPath = path.join(dir, 'original.gif');
  gm(destPath)
  .format(function (err, type) {
    if (err) return finish(err);

    assert.equal(type, 'GIF');
    assert.equal(this.data.format, 'GIF');

    finish();
  })
}
