const assert = require('assert');
const path = require('path');

module.exports = function (img, dir, finish, gm, imageMagick) {

  assert.equal(undefined, gm.prototype._options.timeout);
  assert.equal(undefined, img._options.timeout);

  var g = gm('test').options({ timeout: 100 });
  assert.equal(100, g._options.timeout);

  var sub = gm.subClass({ timeout: 2000 });
  assert.equal(2000, sub.prototype._options.timeout);


  if (!gm.integration)
    return finish();

  const sourcePath = path.join(dir, 'photo.JPG');
  const timeoutPath = path.join(dir, 'timeout.png');
  gm(sourcePath).options({ timeout: 1, imageMagick })
  .thumb(50, 80, timeoutPath, function subthumb (err) {
    assert.ok(err, "Expecting a timeout error");
    noTimeout();
  });


  function noTimeout() {
    gm(sourcePath).options({ timeout: 0, imageMagick })
    .thumb(50, 80, timeoutPath, function subthumb (err) {
      finish(err);
    });
  }

}
