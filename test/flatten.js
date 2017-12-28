var assert = require('assert')

module.exports = function (img, dir, finish, gm) {
  // graphicsmagick considers PSD broken
  // http://www.graphicsmagick.org/NEWS.html#may-30-2016
  if (!img._options.imageMagick) {
    return finish();
  }

  var m = gm(dir + '/layers.psd')
  .options({ imageMagick: true })
  .flatten();

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-flatten', args[2]);

  if (!gm.integration)
    return finish();

  m
  .write(dir + '/unlayered.jpg', function (err) {
    finish(err);
  });
}
