var assert = require('assert')

module.exports = function (_, dir, next, gm) {
  var out = require('path').resolve(dir + '/append.jpg');

  try {
    require('fs').unlinkSync(out);
  } catch (_) {}

  var m = gm(dir + '/lost.png')
  .append(dir + '/original.jpg', dir + '/original.jpg')
  .append()
  .background('#222')

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-background',args[1]);
  assert.equal('#222',args[2]);
  assert.ok(/examples\/imgs\/lost\.png$/.test(args[3]));
  assert.ok(/examples\/imgs\/original\.jpg$/,args[4]);
  assert.ok(/examples\/imgs\/original\.jpg$/,args[5]);
  assert.equal('-append',args[6]);
  assert.equal('-',args[7]);

  if (!gm.integration) {
    return horizontal(dir, next, gm);
  }

  m.write(out, function (err) {
    if (err) return next(err);
    gm(out).size(function (err, size) {
      if (err) return next(err);
      assert.equal(460, size.width);
      assert.equal(435, size.height);

      horizontal(dir, next, gm);
    })
  });
}

function horizontal (dir, next, gm) {
  var out = require('path').resolve(dir + '/appendHorizontal.jpg');

  var m = gm(dir + '/original.jpg')
  .append(dir + '/lost.png', true);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.ok(/examples\/imgs\/original\.jpg$/.test(args[1]));
  assert.ok(/examples\/imgs\/lost\.png$/.test(args[2]));
  assert.equal('+append',args[3]);
  assert.equal('-',args[4]);

  if (!gm.integration) {
    return next();
  }

  m
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
