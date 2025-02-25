const path = require('path');

module.exports = function (_, dir, finish, gm, imageMagick) {
  if (!gm.integration)
    return finish();

  const originalGifPath = path.join(dir, 'original.gif[0]');
  const gifFramePath = path.join(dir, 'gifFrame.jpg');
  gm(originalGifPath).options({imageMagick})
  .write(gifFramePath, function gifFrame (err){
    finish(err);
  });
}
