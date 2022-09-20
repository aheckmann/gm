
const assert = require('assert')
const fs = require('fs');
const path = require('path');

module.exports = function (_, dir, finish, gm, imageMagick) {
  if (!gm.integration)
    return finish();

  const originalPathName = path.join(dir, 'original.jpg');
  const thumbPathName = path.join(dir, 'thumb.png');

  gm(originalPathName).options({ imageMagick }).thumb(150, 40, thumbPathName, function thumb (err) {
    gm(thumbPathName).options({ imageMagick }).size(function (err, size) {
      if (err) return finish(err);

      assert.equal(142, size.width);
      assert.equal(40, size.height);

      gm(originalPathName).options({ imageMagick }).thumbExact(150, 40, thumbPathName, function thumb (err) {
        gm(thumbPathName).options({ imageMagick }).size(function (err, size) {
          assert.equal(150, size.width);
          assert.equal(40, size.height);
          finish(err);
        });
      });
    });
  });
}
