
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .edge(2);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-edge', args[2]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/edge.png', function edge (err) {
    finish(err);
  });
}
