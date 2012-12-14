
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .blur(8, 4)
  .stroke("red", 3)
  .fill("#ffffffbb")
  .drawBezier([0, 10], [183, 163], [183, 10], [0, 10])

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-blur', args[2]);
  assert.equal('8x4', args[3]);
  assert.equal('-strokewidth', args[4]);
  assert.equal(3, args[5]);
  assert.equal('-stroke', args[6]);
  assert.equal('red', args[7]);
  assert.equal('-fill', args[8]);
  assert.equal('#ffffffbb', args[9]);
  assert.equal('-draw', args[10]);
  assert.equal('bezier 0,10,183,163,183,10,0,10', args[11]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/bezier.png', function bezier (err) {
    finish(err);
  });
}
