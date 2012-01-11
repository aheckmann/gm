
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)


var assert = require('assert')

module.exports = function (_, dir, finish, gm) {

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

  gm(dir + '/photo.JPG')
  .thumb(50, 80, dir + '/SUBthumb.png', function subthumb (err) {
    if (err) return finish(err);
    finish();
  });
}
