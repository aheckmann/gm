
var assert = require('assert');

module.exports = function (gm, dir, finish, GM) {
  if (!GM.integration)
    return finish();

  var validResult = 'original.jpg: JPEG, 460x155';

  // pass string test
  gm
  .format('%f: %m, %wx%h', function getterformatcustom (err, format) {
    if (err) return finish(err);

    assert.equal(format, validResult);
    assert.equal(gm.data.format, validResult);

    // pass object test
    gm
    .format({ custom: '%f: %m, %wx%h' }, function getterformatcustom (err, format) {
      if (err) return finish(err);

      assert.equal(format, validResult);
      assert.equal(gm.data.format, validResult);

      finish();
    });
  });
}
