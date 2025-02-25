const assert = require('assert');
const path = require('path');

module.exports = function (gm, dir, finish, GM, imageMagick) {

  var a = GM('img.png').options({imageMagick}).scale(100);
  var args = a.args();
  assert.equal('convert', args[0]);
  assert.equal('-scale', args[2]);
  if (a._options.imageMagick) {
    assert.equal('100', args[3]);
  } else {
    assert.equal('100x', args[3]);
  }

  var a = GM('img.png').options({imageMagick}).scale(100, 200, '%');
  var args = a.args();
  assert.equal('convert', args[0]);
  assert.equal('-scale', args[2]);
  assert.equal('100x200%', args[3]);

  var a = GM('img.png').options({imageMagick}).scale(100, '200%');
  var args = a.args();
  assert.equal('convert', args[0]);
  assert.equal('-scale', args[2]);
  assert.equal('100x200%', args[3]);

  var m = gm.options({imageMagick}).scale(100, 100);
  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-scale', args[2]);
  assert.equal('100x100', args[3]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'scale.png');
  m.write(destPath, function scale (err) {
    finish(err);
  });
}
