const path = require('path');
const fs = require('fs');

module.exports = function (_, dir, finish, gm, imageMagick) {
  if (!gm.integration)
    return finish();

  const originalPath = path.join(dir, 'original.jpg');
  gm(fs.createReadStream(originalPath))
  .options({imageMagick})
  .size({bufferStream: true}, function (err, size) {
    const destPath = path.join(dir, 'streamInGetter.png');
    this.write(destPath, function streamInGetter (err){
      finish(err);
    });
  });
}