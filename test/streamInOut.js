const path = require('path');
const fs = require('fs');

module.exports = function (_, dir, finish, gm, imageMagick) {

  if (!gm.integration)
    return finish();

  const originalPath = path.join(dir, 'original.jpg');
  gm(fs.createReadStream(originalPath), "original.jpg")
  .options({imageMagick})
  .stream(function streamOut (err, stdout, stderr) {
    if (err) return finish(err);
    const destPath = path.join(dir, 'streamInOut.jpg');
    stdout.pipe(fs.createWriteStream(destPath));
    stdout.on('error', finish);
    stdout.on('close', finish);
  });
}
