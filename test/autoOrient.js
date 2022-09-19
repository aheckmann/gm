const assert = require('assert');
const path = require('path');

module.exports = function (_, dir, finish, gm) {
  if (!gm.integration)
    return finish();

  const sidewaysPath = path.join(dir, 'originalSideways.jpg');

  gm(sidewaysPath).identify(function (err, o) {
    if (err) return finish(err);

    assert.equal('155x460', o.Geometry);

    // this image is sideways, but may be auto-oriented by modern OS's
    // try opening it in a browser to see its true orientation
    gm(sidewaysPath)
    .autoOrient()
    .stream(function (err, stream) {
      if (err) return finish(err);

      gm(stream).identify(function (err, data) {
        if (err) return finish(err);

        assert.equal('460x155', data.Geometry);
        finish(err);
      })
    })
  });
}
