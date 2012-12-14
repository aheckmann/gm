var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .scale(200, 100)
  .extent(300,300)

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-size', args[1]);
  assert.equal('300x300', args[2]);
  assert.equal('-scale', args[4]);
  assert.equal('200x100', args[5]);
  assert.equal('-extent', args[6]);
  assert.equal('300x300', args[7]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/extent.png', function resize (err) {
    finish(err);
  });
}
