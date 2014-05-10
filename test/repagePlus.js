var assert = require('assert')

module.exports = function (gm, dir, finish, GM, im) {

  // GraphicsMagick 1.3.12 using on Travis server does not support "repage+" (>=1.3.16 is needed)
  if (require('os').platform() === 'linux' && !im) return finish()

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
