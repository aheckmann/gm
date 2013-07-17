
var assert = require('assert');

module.exports = function (gm, dir, finish, GM) {
  if (!GM.integration)
    return finish();

  var validResult = 'original.jpg: JPEG, 460x155';

  // pass string test
  var gmObject =
  gm
  .custom('%f: %m, %wx%h', function getterformatcustom (err, custom) {
    if (err) return finish(err);

    assert.equal(custom, validResult);
    assert.equal(gm.data.custom, validResult);

    // pass object test
    gm
    .custom({ pattern: '%f: %m, %wx%h' }, function getterformatcustom (err, custom) {
      if (err) return finish(err);

      assert.equal(custom, validResult);
      assert.equal(gm.data.custom, validResult);

      gmObject
      .custom('%f: %m, %wx%h', function getterformatcustom (err, custom) {
        if (err) return finish(err);

        assert.equal(custom, validResult);
        assert.equal(gm.data.custom, validResult);

        finish();
      });
    });
  });
}
