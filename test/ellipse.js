const assert = require('assert')
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .blur(8, 4)
  .stroke("blue", 1)
  .drawEllipse(155, 80, 130, 50);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-blur', args[2]);
  assert.equal('8x4', args[3]);
  assert.equal('-strokewidth', args[4]);
  assert.equal(1, args[5]);
  assert.equal('-stroke', args[6]);
  assert.equal('blue', args[7]);
  assert.equal('-draw', args[8]);
  assert.equal('ellipse 155,80 130,50 0,360', args[9]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'ellipse.png');
  m.write(destPath, function ellipse (err) {
    finish(err);
  });
}
