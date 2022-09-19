const assert = require('assert');
const fs = require('fs');

module.exports = function (gm, dir, finish, GM) {
  if (!GM.integration)  return finish();

  const ico = `${__dirname}/fixtures/test.ico`;
  const buffer = fs.readFileSync(ico);
  const stream = fs.createReadStream(ico);

  GM(ico).size(function (err, size) {
    if (err) {
      err.message = 'Failed using ico filename. ' + err.message;
      return finish(err);
    }

    GM(buffer, 'img.ico').size(function (err, size) {
      if (err) {
        err.message = 'Failed using ico buffer. ' + err.message;
        return finish(err);
      }

      GM(stream, 'img.ico').size({bufferStream: true}, function (err, size) {
        if (err) {
          err.message = 'Failed using ico stream. ' + err.message;
          return finish(err);
        }
        finish();
      });
    });
  });
}