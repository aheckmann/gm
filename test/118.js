/*
 * If only the width is specified for a resize operation, 
 * GraphicsMagick requires the format
 * -resize 10x
 * while ImageMagick requires the format
 * -resize 10 
 *
 */
var assert = require('assert')

module.exports = function (_, dir, finish, gm) {
  if (!gm.integration)  return finish();
    
  var src = dir + '/originalSideways.jpg';
  var dst = dir + '/originalSideways10x.jpg';

  gm(src).resize(10).write(dst, function(err) {
    gm(dst).size(function(err, size) {
      if (err) return finish(err);
      assert.equal(10, size.width);
      finish();
    });
  });

}
