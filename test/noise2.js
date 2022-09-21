const assert = require('assert');
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m  = gm
  .noise('laplacian');

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('+noise', args[2]);
  assert.equal('laplacian', args[3]);

  if (!GM.integration)
    return finish();


  const destPath = path.join(dir, 'noise2.png');
  m.write(destPath, function noise2 (err) {
    finish(err);
  });
}
