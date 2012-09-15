var assert = require('assert')
var out;

module.exports = function (_, dir, next, gm) {
  out = require('path').resolve(dir + '/append.jpg');

  try {
    require('fs').unlinkSync(out);
  } catch (_) {}

  gm(dir + '/lost.png')
  .append(dir + '/original.jpg')
  .append()
  .background('#222')
  .write(out, function (err) {
    if (err) return next(err);
    gm(out).size(function (err, size) {
      if (err) return next(err);
      assert.equal(460, size.width);
      assert.equal(280, size.height);

      horizontal(dir, next, gm);
    })
  });
}

function horizontal (dir, next, gm) {

  gm(dir + '/original.jpg')
  .append(dir + '/lost.png', true)
  .write(out, function (err) {
    if (err) return next(err);
    gm(out).size(function (err, size) {
      if (err) return next(err);
      assert.equal(697, size.width);
      assert.equal(155, size.height);

      next();
    })
  });

}
