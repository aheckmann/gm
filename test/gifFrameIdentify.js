const assert = require('assert')
const path = require('path');

module.exports = function (_, dir, finish, gm) {
  const originalGifPath = path.join(dir, 'original.gif[0]');
  var m = gm(originalGifPath);

  if (!gm.integration)
    return finish();

  m.identify('%n', function (err, stdout) {
    if (err) return finish(err);

    assert.equal(parseInt(stdout.toString(), 10), 1);
    finish();
  })
}
