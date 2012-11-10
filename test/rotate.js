
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

var assert = require('assert')

module.exports = function (gm, dir, finish) {

  gm
  .rotate('red', -40)
  .write(dir + '/rotate.png', function rotate (err, _0, _1, cmd) {
    assert.ok(/"-rotate" "-40"/.test(cmd));

    gm
    .rotate('red', 0)
    .write(dir + '/rotate.png', function rotate (err, _0, _1, cmd) {
      assert.ok(!/"-rotate" "-40"/.test(cmd));
      assert.ok(/"-rotate" "0"/.test(cmd));
      finish(err);
    });

  });
}
