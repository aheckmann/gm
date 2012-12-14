
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .spread(12);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-spread', args[2]);
  assert.equal(12, args[3]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/spread.png', function spread (err) {
    finish(err);
  });
}
