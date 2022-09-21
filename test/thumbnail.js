const assert = require('assert');
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .thumbnail(200, 201);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-thumbnail', args[2]);
  assert.equal('200x201', args[3]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'thumbnail.png');
  m.write(destPath, function thumbnail (err) {
    finish(err);
  });
}
