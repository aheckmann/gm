
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

var should = require('should');

module.exports = function (_, dir, finish, gm) {
  var err;

  try {
    var gif = gm('/path/to/blah.gif');
    gif.inputIs('gif').should.be.true;
    gif.inputIs('jpg').should.be.false;
    gif.inputIs('crazy').should.be.false;

    var png = gm('png.png');
    png.inputIs('png').should.be.true;
    png.inputIs('gif').should.be.false;
    png.inputIs('tif').should.be.false;

    var jpg = gm('super/duper.jpeg');
    jpg.inputIs('jpg').should.be.true;
    jpg.inputIs('jpeg').should.be.true;
    jpg.inputIs('gif').should.be.false;
    jpg.inputIs('tif').should.be.false;
    jpg.inputIs('gif').should.be.false;

    var unknown = gm('super.unknown');
    unknown.inputIs('unknown').should.be.true;
    unknown.inputIs('.unknown').should.be.true;
    unknown.inputIs().should.be.false;
    unknown.inputIs('').should.be.false;
    unknown.inputIs('png').should.be.false;
    unknown.inputIs('pngasdf').should.be.false;
  } catch (e) {
    err = e;
    console.error(e.stack);
  }

  finish(err);
}
