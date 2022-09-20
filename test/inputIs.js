const assert = require('assert')
const path = require('path');

module.exports = function (_, dir, finish, gm) {
  var err;

  try {
    const blahPath = path.join('path', 'to', 'blah.gif') ;
    var gif = gm(blahPath);
    assert.equal(true, gif.inputIs('gif'));
    assert.equal(false, gif.inputIs('jpg'));
    assert.equal(false, gif.inputIs('crazy'));

    var png = gm('png.png');
    assert.equal(true, png.inputIs('png'));
    assert.equal(false, png.inputIs('gif'));
    assert.equal(false, png.inputIs('tif'));

    const jpgPath = path.join('super', 'duper.jpeg')
    var jpg = gm(jpgPath);
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
