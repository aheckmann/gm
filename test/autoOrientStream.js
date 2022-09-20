
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)
// This is a copy of `autoOrient.js` using streams

const assert = require('assert')
const fs = require('fs')
const path = require('path');

module.exports = function (_, dir, finish, gm, imageMagick) {
  if (!gm.integration)
    return finish();

  const filename = path.join(dir, 'autoOrientStream.jpg');
  const sidewaysPathName = path.join(dir, 'originalSideways.jpg');

  gm(fs.createReadStream(sidewaysPathName)).options({imageMagick}).identify(function (err) {
    if (err) return finish(err);

    const geo = imageMagick ? '155x460+0+0' : '155x460';
    assert.equal(geo, this.data.Geometry);

    // this image is sideways, but may be auto-oriented by modern OS's
    // try opening it in a browser to see its true orientation
    gm(fs.createReadStream(sidewaysPathName))
    .options({imageMagick})
    .autoOrient()
    .write(filename, function autoOrient (err) {
      if (err) return finish(err);

      // fs race condition
      setTimeout(function () {
        gm(filename).options({imageMagick}).identify(function (err) {
          if (err) return finish(err);

          const geo2 = imageMagick ? '460x155+0+0' : '460x155';
          assert.equal(geo2, this.data.Geometry);

          finish(err);
        });
      }, 200);
    });
  });
}
