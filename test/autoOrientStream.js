
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)
// This is a copy of `autoOrient.js` using streams

var assert = require('assert')
var fs = require('fs')

module.exports = function (_, dir, finish, gm) {
  if (!gm.integration)
    return finish();

  var filename = dir + '/autoOrientStream.jpg';

  gm(fs.createReadStream(dir + '/originalSideways.jpg')).identify(function (err) {
    if (err) return finish(err);

    assert.equal('155x460', this.data.Geometry);

    // this image is sideways, but may be auto-oriented by modern OS's
    // try opening it in a browser to see its true orientation
    gm(fs.createReadStream(dir + '/originalSideways.jpg'))
    .autoOrient()
    .write(filename, function autoOrient (err) {
      if (err) return finish(err);

      // fs race condition
      setTimeout(function () {
        gm(filename).identify(function (err) {
          if (err) return finish(err);

          assert.equal('460x155', this.data.Geometry);

          finish(err);
        });
      }, 200);
    });
  });
}
