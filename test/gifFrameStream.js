const assert = require('assert')
const path = require('path');
const fs = require('fs');

module.exports = function (_, dir, finish, gm, imageMagick) {
  const originalGifPath = path.join(dir, 'original.gif');
  const readStream = fs.createReadStream(originalGifPath);
  const m = gm(readStream, "original.gif[0]").options({imageMagick});

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-[0]', args[1]);

  if (!gm.integration)
    return finish();

  const destPath = path.join(dir, 'gifFrameStream.jpg');
  m.write(destPath, function gifFrame (err){
    finish(err);
  });
}
