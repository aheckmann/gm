const assert = require('assert');
const path = require('path');
const fs = require('fs');

module.exports = function (_, dir, finish, gm, imageMagick) {

  const originalPath = path.join(dir, 'original.jpg');
  const stream = fs.createReadStream(originalPath);
  const m = gm(stream, "original.jpg").options({imageMagick});

  assert.equal(stream, m.sourceStream);
  assert.equal('original.jpg', m.source);

  if (!gm.integration)
    return finish();

  const destPath = path.join(dir, 'streamIn.png');
  m.write(destPath, function streamIn (err) {
    finish(err);
  });
}
