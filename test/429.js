const fs = require('fs');
const path = require('path');

module.exports = function (gm, dir, finish, GM, imageMagick) {
  if (!GM.integration)  return finish();

  const ico = path.join(__dirname, 'fixtures', 'test.ico');
  const buffer = fs.readFileSync(ico);
  const stream = fs.createReadStream(ico);

  GM(ico).options({ imageMagick }).size(function (err) {
    if (err) {
      err.message = 'Failed using ico filename. ' + err.message;
      return finish(err);
    }

    GM(buffer, 'img.ico').options({ imageMagick }).size(function (err) {
      if (err) {
        err.message = 'Failed using ico buffer. ' + err.message;
        return finish(err);
      }

      GM(stream, 'img.ico').options({ imageMagick }).size({bufferStream: true}, function (err) {
        if (err) {
          err.message = 'Failed using ico stream. ' + err.message;
          return finish(err);
        }
        finish();
      });
    });
  });
}