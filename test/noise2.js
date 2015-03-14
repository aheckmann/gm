
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m  = gm
  .noise('laplacian');

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('+noise', args[2]);
  assert.equal('Laplacian', args[3]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/noise2.png', function noise2 (err) {
    finish(err);
  });
}
