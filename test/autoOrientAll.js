
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

var assert = require('assert'),
    fs = require('fs');

module.exports = function (_, dir, finish, gm) {
  if (!gm.integration)
    return finish();

  var filename = dir + '/autoOrient.jpg';

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
    'Landscape_1.jpg': ['TopLeft', false, '600x450'],
    'Landscape_2.jpg': ['Unknown', true, '600x450'],
    'Landscape_3.jpg': ['Unknown', true, '600x450'],
    'Landscape_4.jpg': ['Unknown', true, '600x450'],
    'Landscape_5.jpg': ['Unknown', true, '600x450'],
    'Landscape_6.jpg': ['Unknown', true, '600x450'],
    'Landscape_7.jpg': ['Unknown', true, '600x450'],
    'Landscape_8.jpg': ['Unknown', true, '600x450'],
    'Portrait_1.jpg': ['TopLeft', false, '450x600'],
    'Portrait_2.jpg': ['Unknown', true, '450x600'],
    'Portrait_3.jpg': ['Unknown', true, '450x600'],
    'Portrait_4.jpg': ['Unknown', true, '450x600'],
    'Portrait_5.jpg': ['Unknown', true, '450x600'],
    'Portrait_6.jpg': ['Unknown', true, '450x600'],
    'Portrait_7.jpg': ['Unknown', true, '450x600'],
    'Portrait_8.jpg': ['Unknown', true, '450x600']
  };
  fs.readdir(dir + '/orientation/', function(err, files) {
    if (err) return finish(err);

    var originalFiles = files.filter(function(file) {
      return /\d\.jpg$/.test(file);
    });

    function next () {
      test(originalFiles.pop());
    }

    return next();

    function test (filename) {
      if (!filename) return finish();

      var fileToAutoOrient = dir + '/orientation/' + filename;
      var newFilename = fileToAutoOrient + '.oriented.jpg';
      var constant = fileToAutoOrient + '.correct.jpg';

      gm(fileToAutoOrient).orientation(function (err, o) {
        if (err) return finish(err);

        assert.equal(beforeValues[filename][0], o);
        assert.equal(beforeValues[filename][1], this.data['Profile-EXIF'].Orientation, 'No Profile-EXIF data found');
        assert.equal(beforeValues[filename][2], this.data.Geometry);

        // this image is sideways, but may be auto-oriented by modern OS's
        // try opening it in a browser to see its true orientation
        gm(fileToAutoOrient)
        .autoOrient()
        .write(newFilename, function autoOrient (err) {
          if (err) return finish(err);

          // fs race condition
          setTimeout(function () {
            gm(newFilename).identify(function (err) {
              if (err) return finish(err);

              assert.equal(afterValues[filename][0], this.data.Orientation, 'Bad-Orientation for ' + filename);
              assert.equal(afterValues[filename][1], !this.data['Profile-EXIF'], 'Profile-EXIF still exists');
              assert.equal(afterValues[filename][2], this.data.Geometry, 'Bad-Geometry for ' + filename);

              gm.compare(newFilename, constant, 0.1, function (err, equal) {
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

