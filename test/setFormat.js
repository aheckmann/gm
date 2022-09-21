const assert = require('assert');
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .setFormat('png');

  assert.equal('png', m._outputFormat);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'setFormat.png');
  m.write(destPath, function setformat (err) {
    finish(err);
  });
}
