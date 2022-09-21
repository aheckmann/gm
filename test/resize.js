const assert = require('assert');
const path = require('path');

module.exports = function (gm, dir, finish, GM, imageMagick) {

  var a = GM('img.png').options({imageMagick}).resize(10);
  var args = a.args();
  assert.equal('convert', args[0]);
  assert.equal('-resize', args[2]);
  if (imageMagick) {
    assert.equal('10', args[3]);
  } else {
    assert.equal('10x', args[3]);
  }

  var a = GM('img.png').options({imageMagick}).resize(10, 20);
  var args = a.args();
  assert.equal('convert', args[0]);
  assert.equal('-resize', args[2]);
  assert.equal('10x20', args[3]);

  var a = GM('img.png').options({imageMagick}).resize(10, false, '%');
  var args = a.args();
  assert.equal('convert', args[0]);
  assert.equal('-resize', args[2]);
  if (imageMagick) {
    assert.equal('10%', args[3]);
  } else {
    assert.equal('10x%', args[3]);
  }

  var a = GM('img.png').options({imageMagick}).resize('10%');
  var args = a.args();
  assert.equal('convert', args[0]);
  assert.equal('-resize', args[2]);
  if (imageMagick) {
    assert.equal('10%', args[3]);
  } else {
    assert.equal('10%x', args[3]);
  }

  var m = gm.options({imageMagick}).resize(58, 50, '%');
  var args=  m.args();
  assert.equal('convert', args[0]);
  assert.equal('-resize', args[2]);
  assert.equal('58x50%', args[3]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'resize.png');
  m.write(destPath, function resize (err) {
    finish(err);
  });
}
