const assert = require('assert')
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .edge(2);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-edge', args[2]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'edge.png');
  m.write(destPath, function edge (err) {
    finish(err);
  });
}
