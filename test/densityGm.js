const assert = require('assert')
const path = require('path');

module.exports = function (gm, dir, finish, GM, imageMagick) {
  var NUMBER = 100;
  var NUMBER2 = 200;
  var g = gm.density(NUMBER, NUMBER2);
  var gArgs = g.args();
  assert.equal('convert', gArgs[0]);
  assert.equal('-density', gArgs[1]);
  assert.equal(NUMBER + 'x' + NUMBER2, gArgs[2]);

  if (imageMagick) {
    // graphicsmagick does not support density with two arguments
    var imArgs = GM().options({imageMagick}).density(NUMBER).args();
    assert.equal('convert', imArgs[0]);
    assert.equal('-density', imArgs[1]);
    assert.equal(NUMBER, imArgs[2]);
  }

  if (!GM.integration) return finish();

  const destPath = path.join(dir, 'density.png');
  g.write(destPath, function density (err) {
    finish(err);
  });
};
