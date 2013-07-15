
var assert = require('assert');

module.exports = function (gm, dir, finish, GM) {
  if (!GM.integration)
    return finish();

  gm
  .format({ custom: '%f: %m, %wx%h' }, function getterformatcustom (err, format) {
    if (err) return finish(err);

    var validResult = 'original.jpg: JPEG, 460x155';

    assert.equal(format, validResult);
    assert.equal(gm.data.format, validResult);

    finish();
  });
}
