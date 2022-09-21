/*
 * If only the width is specified for a resize operation,
 * GraphicsMagick requires the format
 * -resize 10x
 * while ImageMagick requires the format
 * -resize 10
 *
 */
const assert = require('assert')
const path = require('path');

module.exports = function (_, dir, finish, gm, imageMagick) {
  if (!gm.integration) return finish();

  var src = path.join(dir, 'originalSideways.jpg');
  var dst = path.join(dir, 'originalSideways10x.jpg');

  gm(src).options({ imageMagick }).resize(10).write(dst, function(err) {
    gm(dst).options({ imageMagick }).size(function(err, size) {
      if (err) return finish(err);
      assert.equal(10, size.width);
      finish();
    });
  });

}
