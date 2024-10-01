const assert = require('assert');
const path = require('path');
const fs = require('fs')

module.exports = function (_, dir, finish, gm, imageMagick) {
    if (!gm.integration)  return finish();

    var imagePath = path.join(__dirname, 'fixtures', 'test.pdf');
    var inputStream = fs.createReadStream(imagePath);
    gm(inputStream, 'test.pdf').options({ imageMagick }).identify('%p', function(err, value) {
        if (err) return finish(err);
        assert.equal(value, '1');
        finish();
    });
}
