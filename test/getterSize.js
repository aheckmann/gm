
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

var assert = require('assert');

module.exports = function (gm, dir, finish, GM) {

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
