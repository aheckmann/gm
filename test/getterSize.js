
var assert = require('assert');

module.exports = function (gm, dir, finish, GM) {
  if (!GM.integration)
    return finish();

  gm
  .size(function gettersize (err, size) {
    if (err) return finish(err);

    assert.equal(size.width, 460);
    assert.equal(size.height, 155);

    GM(dir + '/identifyParseErr.jpg').size(function (err) {
      if (err) return finish(err);
      finish();
    });
  });
}
