
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

var assert = require('assert')

module.exports = function (_, dir, finish, gm) {
  var err;

  try {
    var gif = gm('/path/to/blah.gif');
    assert.equal(true, gif.inputIs('gif'));
    assert.equal(false, gif.inputIs('jpg'));
    assert.equal(false, gif.inputIs('crazy'));

    var png = gm('png.png');
    assert.equal(true, png.inputIs('png'));
    assert.equal(false, png.inputIs('gif'));
    assert.equal(false, png.inputIs('tif'));

    var jpg = gm('super/duper.jpeg');
    assert.equal(true, jpg.inputIs('jpg'));
    assert.equal(true, jpg.inputIs('jpeg'));
    assert.equal(false, jpg.inputIs('gif'));
    assert.equal(false, jpg.inputIs('tif'));
    assert.equal(false, jpg.inputIs('gif'));

    var unknown = gm('super.unknown');
    assert.equal(true, unknown.inputIs('unknown'));
    assert.equal(true, unknown.inputIs('.unknown'));
    assert.equal(false, unknown.inputIs());
    assert.equal(false, unknown.inputIs(''));
    assert.equal(false, unknown.inputIs('png'));
    assert.equal(false, unknown.inputIs('pngasdf'));
  } catch (e) {
    err = e;
    console.error(e.stack);
  }

  finish(err);
}
