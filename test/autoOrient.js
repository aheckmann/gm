const assert = require('assert');
const path = require('path');

module.exports = function (_, dir, finish, gm, imageMagick) {
  if (!gm.integration)
    return finish();

  const sidewaysPath = path.join(dir, 'originalSideways.jpg');

  gm(sidewaysPath)
  .options({imageMagick})
  .identify(function (err, o) {
    if (err) return finish(err);

    const geo = imageMagick ? '155x460+0+0' : '155x460';
    assert.equal(geo, o.Geometry);

    // this image is sideways, but may be auto-oriented by modern OS's
    // try opening it in a browser to see its true orientation
    gm(sidewaysPath)
    .options({imageMagick})
    .autoOrient()
    .stream(function (err, stream) {
      if (err) return finish(err);

      gm(stream)
      .options({imageMagick})
      .identify(function (err, data) {
        if (err) return finish(err);

        const geo2 = imageMagick ? '460x155+0+0' : '460x155';
        assert.equal(geo2, data.Geometry);
        finish(err);
      })
    })
  });
}
