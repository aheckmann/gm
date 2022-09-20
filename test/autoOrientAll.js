const assert = require('assert');
const fs = require('fs');
const path = require('path');

module.exports = function (_, dir, finish, gm, imageMagick) {
  if (!gm.integration) return finish();

  var beforeValues = {
    'Landscape_1.jpg': ['TopLeft', 1, '600x450'],
    'Landscape_2.jpg': ['TopRight', 2, '600x450'],
    'Landscape_3.jpg': ['BottomRight', 3, '600x450'],
    'Landscape_4.jpg': ['BottomLeft', 4, '600x450'],
    'Landscape_5.jpg': ['LeftTop', 5, '450x600'],
    'Landscape_6.jpg': ['RightTop', 6, '450x600'],
    'Landscape_7.jpg': ['RightBottom', 7, '450x600'],
    'Landscape_8.jpg': ['LeftBottom', 8, '450x600'],
    'Portrait_1.jpg': ['TopLeft', 1, '450x600'],
    'Portrait_2.jpg': ['TopRight', 2, '450x600'],
    'Portrait_3.jpg': ['BottomRight', 3, '450x600'],
    'Portrait_4.jpg': ['BottomLeft', 4, '450x600'],
    'Portrait_5.jpg': ['LeftTop', 5, '600x450'],
    'Portrait_6.jpg': ['RightTop', 6, '600x450'],
    'Portrait_7.jpg': ['RightBottom', 7, '600x450'],
    'Portrait_8.jpg': ['LeftBottom', 8, '600x450']
  };

  var afterValues = {
    'Landscape_1.jpg': '600x450',
    'Landscape_2.jpg': '600x450',
    'Landscape_3.jpg': '600x450',
    'Landscape_4.jpg': '600x450',
    'Landscape_5.jpg': '600x450',
    'Landscape_6.jpg': '600x450',
    'Landscape_7.jpg': '600x450',
    'Landscape_8.jpg': '600x450',
    'Portrait_1.jpg': '450x600',
    'Portrait_2.jpg': '450x600',
    'Portrait_3.jpg': '450x600',
    'Portrait_4.jpg': '450x600',
    'Portrait_5.jpg': '450x600',
    'Portrait_6.jpg': '450x600',
    'Portrait_7.jpg': '450x600',
    'Portrait_8.jpg': '450x600'
  };

  const orientationDir = path.join(dir, 'orientation');

  fs.readdir(orientationDir, function(err, files) {
    if (err) return finish(err);

    var originalFiles = files.filter(function(file) {
      return beforeValues[file] && afterValues[file];
    });

    function next () {
      test(originalFiles.pop());
    }

    return next();

    function test (filename) {
      if (!filename) return finish();

      const fileToAutoOrient = path.join(orientationDir, filename);
      const newFilename = fileToAutoOrient + '.oriented.jpg';
      const constant = fileToAutoOrient + '.correct.jpg';

      gm(fileToAutoOrient).options({imageMagick}).orientation(function (err, o) {
        if (err) return finish(err);

        assert.equal(beforeValues[filename][0], o);
        assert.equal(beforeValues[filename][1], this.data['Profile-EXIF'].Orientation, 'No Profile-EXIF data found');

        // this image is sideways, but may be auto-oriented by modern OS's
        // try opening it in a browser to see its true orientation
        gm(fileToAutoOrient)
        .options({ imageMagick })
        .autoOrient()
        .write(newFilename, function autoOrient (err) {
          if (err) return finish(err);

          // fs race condition
          setTimeout(function () {
            gm(newFilename).options({ imageMagick }).identify(function (err) {
              if (err) return finish(err);

              const afterValue = imageMagick ? `${afterValues[filename]}+0+0` : afterValues[filename];
              assert.equal(afterValue, this.data.Geometry, `Bad-Geometry for ${filename}. Got "${this.data.Geometry}"`);

              gm().options({imageMagick}).compare(newFilename, constant, 0.1, function (err, equal) {
                if (err) return finish(err);
                assert.ok(equal);
                next();
              })
            });
          }, 200);
        });
      });
    }
  });

};
