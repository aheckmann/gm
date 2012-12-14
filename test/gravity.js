var assert = require('assert')

module.exports = function (img, dir, finish, gm) {
  var changed = gm('whatever.png').gravity("Souths")
  assert.equal(changed._out[1], 'NorthWest');

  var m = img
  .scale(200, 100)
  .gravity("South")
  .extent(300,300);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-size', args[1]);
  assert.equal('300x300', args[2]);
  args= args.slice(4);
  assert.deepEqual(args, [
    '-scale',
    '200x100',
    '-gravity',
    'South',
    '-extent',
    '300x300',
    '-' ])

  if (!gm.integration)
    return finish();

  m
  .write(dir + '/gravity.png', function resize (err) {
    finish(err);
  });
}
