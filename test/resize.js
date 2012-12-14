
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var a = GM('img.png').resize(10);
  var args = a.args();
  assert.equal('convert', args[0]);
  assert.equal('-resize', args[2]);
  assert.equal('10', args[3]);

  var a = GM('img.png').resize(10, 20);
  var args = a.args();
  assert.equal('convert', args[0]);
  assert.equal('-resize', args[2]);
  assert.equal('10x20', args[3]);

  var a = GM('img.png').resize(10, false, '%');
  var args = a.args();
  assert.equal('convert', args[0]);
  assert.equal('-resize', args[2]);
  assert.equal('10%', args[3]);

  var a = GM('img.png').resize('10%');
  var args = a.args();
  assert.equal('convert', args[0]);
  assert.equal('-resize', args[2]);
  assert.equal('10%', args[3]);

  var m = gm
  .resize(58, 50, '%');

  var args=  m.args();
  assert.equal('convert', args[0]);
  assert.equal('-resize', args[2]);
  assert.equal('58x50%', args[3]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/resize.png', function resize (err) {
    finish(err);
  });
}
