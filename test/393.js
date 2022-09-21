const assert = require('assert');
const fs = require('fs');
const path = require('path');

module.exports = function (_, dir, finish, gm, imageMagick) {
  if (!gm.integration)  return finish();

  var imagePath = path.join(__dirname, 'fixtures', 'nyancat.gif');
  var inputStream = fs.createReadStream(imagePath);
  gm(inputStream).options({ imageMagick }).identify({ bufferStream: true }, function(err, value) {
      if (err) return finish(err);
      var size = value.size;
      assert.equal(400, size.width);
      assert.equal(400, size.height);
      finish();
    });
}
