
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .rotate('red', -40);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-background', args[2]);
  assert.equal('red', args[3]);
  assert.equal('-rotate', args[4]);
  assert.equal(-40, args[5]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/rotate.png', function rotate (err, _0, _1, cmd) {
    assert.ok(/"-rotate" "-40"/.test(cmd));

    m
    .rotate('red', 0)
    .write(dir + '/rotate.png', function rotate (err, _0, _1, cmd) {
      assert.ok(!/"-rotate" "-40"/.test(cmd));
      assert.ok(/"-rotate" "0"/.test(cmd));
      finish(err);
    });

  });
}
