var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .repage('+');

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('+repage', args[2]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/repage.png', function blur (err) {
    finish(err);
  });
}
