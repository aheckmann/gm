
var assert = require('assert')

module.exports = function (img, dir, finish, gm) {

  assert.equal(undefined, gm.prototype._options.timeout);
  assert.equal(undefined, img._options.timeout);

  var g = gm('test').options({ timeout: 100 });
  assert.equal(100, g._options.timeout);

  var sub = gm.subClass({ timeout: 2000 });
  assert.equal(2000, sub.prototype._options.timeout);


  if (!gm.integration)
    return finish();

  gm(dir + '/photo.JPG').options({ timeout: 1 })
  .thumb(50, 80, dir + '/timeout.png', function subthumb (err) {
    assert.ok(err, "Expecting a timeout error");
    noTimeout();
  });


  function noTimeout() {
    gm(dir + '/photo.JPG').options({ timeout: 0 })
    .thumb(50, 80, dir + '/timeout.png', function subthumb (err) {
      finish(err);
    });
  }

}
