const assert = require('assert');
const path = require('path');

module.exports = function (_, dir, finish, gm) {
  if (!gm.integration)
    return finish();

  const destPath = path.join(dir, 'blue.gif');
  gm(destPath).color(function (err, color) {
    if (err) return finish(err);

    assert.equal(1, color)
    assert.equal(this.data.color, color)

    finish();

  });
}
