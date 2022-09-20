const assert = require('assert');
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .repage('+');

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('+repage', args[2]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'repage.png');
  m.write(destPath, function blur (err) {
    finish(err);
  });
}
