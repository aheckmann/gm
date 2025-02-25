const assert = require('assert');
const path = require('path');

module.exports = function (_, dir, finish, gm, imageMagick) {
  assert.equal('gm', gm('test').constructor.name);
  assert.equal(undefined, gm.prototype._options.imageMagick);

  var sub = gm.subClass({ imageMagick: true });

  assert.equal('gm', sub('test').constructor.name);
  assert.equal(true, sub.prototype._options.imageMagick);
  assert.equal(undefined, gm.prototype._options.imageMagick);

  var s = sub('test');
  assert.equal(true, s._options.imageMagick);

  var g = gm('test');
  assert.equal(undefined, g._options.imageMagick);

  var imageMagick7 = gm.subClass({ imageMagick: '7+'});
  assert.equal('7+', imageMagick7.prototype._options.imageMagick);

  if (!gm.integration)
    return finish();

  const sourcePath = path.join(dir, 'photo.JPG');
  const destPath = path.join(dir, 'subclass.png');
  const m = gm.subClass({ imageMagick });
  m(sourcePath)
  .thumb(50, 80, destPath, function subthumb (err) {
    if (err) return finish(err);
    finish();
  });
}
