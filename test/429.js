const assert = require('assert');
const fs = require('fs');

module.exports = function (gm, dir, finish, GM) {
  if (!GM.integration)  return finish();

  // ico, buffer, stream
  const ico = `${__dirname}/fixtures/test.ico`;
  const buffer = fs.readFileSync(ico);
  const stream = fs.createReadStream(ico);

  GM(ico).size(function (err, size) {
    if (err) return finish(err);
    console.log('string', size);

    GM(buffer, 'img.ico').size(function (err, size) {
      if (err) return finish(err);
      console.log('buffer', size);

      GM(stream, 'img.ico').size({bufferStream: true}, function (err, size) {
        if (err) return finish(err);
        console.log('stream', size);
        finish();
      });
    });
  });
}