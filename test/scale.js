
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var a = GM('img.png').scale(100);
  var args = a.args();
  assert.equal('convert', args[0]);
  assert.equal('-scale', args[2]);
  assert.equal('100', args[3]);

  var a = GM('img.png').scale(100, 200, '%');
  var args = a.args();
  assert.equal('convert', args[0]);
  assert.equal('-scale', args[2]);
  assert.equal('100x200%', args[3]);

  var a = GM('img.png').scale(100, '200%');
  var args = a.args();
  assert.equal('convert', args[0]);
  assert.equal('-scale', args[2]);
  assert.equal('100x200%', args[3]);

  var m = gm
  .scale(100, 100);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-scale', args[2]);
  assert.equal('100x100', args[3]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/scale.png', function scale (err) {
    finish(err);
  });
}
