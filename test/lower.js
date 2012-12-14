
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .lower(10, 14);

  var args= m.args();
  assert.equal('convert', args[0]);
  assert.equal('+raise', args[2]);
  assert.equal('10x14', args[3]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/lower.png', function lower (err) {
    finish(err);
  });
}
