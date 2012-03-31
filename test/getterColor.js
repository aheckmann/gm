
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

var assert = require('assert')

module.exports = function (_, dir, finish, gm) {

  gm(dir + '/blue.gif').color(function (err, color) {
    if (err) return finish(err);

    assert.equal(2, color)
    assert.equal(this.data.color, color)

    var blueWorks = this.data.Colors['0'] == '(  0,  0,255)\t  blue';
    var blackWorks = this.data.Colors['1'] == '(  0,  0,  0)\t  black';

    if (!blueWorks) {
      blueWorks = this.data.Colors['1'] == '(  0,  0,255)\t  blue';
      blackWorks = this.data.Colors['0'] == '(  0,  0,  0)\t  black';
    }

    assert.ok(blueWorks);
    assert.ok(blackWorks);

    finish();

  });
}
