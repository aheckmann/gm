
var assert = require('assert');

module.exports = function (gm, dir, finish, GM) {
  if (!GM.integration)
    return finish();

  gm
  .format(function getterformat (err, format) {
    if (err) return finish(err);

    assert.equal(format, 'JPEG');
    assert.equal(gm.data.format, 'JPEG');

    finish();
  });
}
