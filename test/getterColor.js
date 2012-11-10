
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

var assert = require('assert')

module.exports = function (_, dir, finish, gm) {

  gm(dir + '/blue.gif').color(function (err, color) {
    if (err) return finish(err);

    assert.equal(1, color)
    assert.equal(this.data.color, color)

    finish();

  });
}
