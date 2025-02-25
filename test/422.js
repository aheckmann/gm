const fs = require('fs');
const path = require('path');

module.exports = function (gm, dir, finish, GM, imageMagick) {
  // Same image
  const originalPathName = path.join(dir, 'original.jpg');

  gm.compare(originalPathName, originalPathName, function(err, same, diff) {
    if (err) return finish(err);
    if (!same) {
      const msg = `Compare should be the same! "${same}" "${diff}"`;
      return finish(new Error(msg));
    }

    // Compare almost similar images for which ImageMagick
    // returns an exponent-style floating point number
    const compare1PathName = path.join(__dirname, 'fixtures', 'compare_1.png');
    const compare2PathName = path.join(__dirname, 'fixtures', 'compare_2.png');

    gm.compare(compare1PathName, compare2PathName, function(err, same, diff) {
      if (err) return finish(err);
      if (!same) {
        const msg = `Compare should be the same! "${same}" "${diff}"`;
        return finish(new Error(msg));
      }

      const noisePathName = path.join(dir, 'noise3.png');

      // Create a new noisy image
      gm.noise(0.3).write(noisePathName, function (err) {
        if (err) return finish(err);

        var options = {
          highlightColor: '#fff',
          file: path.join(dir, 'diff.png'),
          tolerance: 0.001
        };

        const originalPathName = path.join(dir, 'original.jpg');

        // Compare these images and write to a file.
        gm.compare(originalPathName, noisePathName, options, function(err) {
          if (err) return finish(err);

          fs.access(options.file, fs.constants.F_OK, function(err) {
            if (err) {
              finish(new Error('Diff file does not exist.'));
            } else {
              fs.unlink(options.file, finish);
            }
          });
        });
      });
    });
  });
};
