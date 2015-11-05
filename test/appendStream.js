var assert = require('assert')
  , fs = require('fs')
  , paths = require('path')
  ;

module.exports = function (_, dir, finish, gm) {
  var out = paths.resolve(dir + '/appendBuffer.jpg');

  try {
    require('fs').unlinkSync(out);
  } catch (_) {}

  var buffer = fs.createReadStream(dir + '/original.jpg');
  var buffer2 = fs.createReadStream(dir + '/original.jpg');
  
  var m = gm(dir + '/lost.png')
  .append(dir + '/original.jpg')
  .append(buffer, buffer2)
  .append()
  .background('#222')

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-background',args[1]);
  assert.equal('#222',args[2]);
  assert.ok(/examples\/imgs\/lost\.png$/.test(args[3]));
  assert.ok(/examples\/imgs\/original\.jpg$/,args[4]);
  assert.equal('-append',args[7]);
  assert.equal('-',args[8]);

  if (!gm.integration) {
    return horizontal(dir, finish, gm);
  }


  m.write(out, function (err) {
    if (err) return finish(err);
    gm(out).size(function (err, size) {
      if (err) return finish(err);
      assert.equal(460, size.width);
      assert.equal(590, size.height);

      horizontal(dir, finish, gm);
    })
  });
}

function horizontal (dir, finish, gm) {
  var out = paths.resolve(dir + '/appendBufferHorizontal.jpg');

  var buffer = fs.createReadStream(dir + '/lost.png');

  var m = gm(dir + '/original.jpg')
  .append(buffer, true);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.ok(/examples\/imgs\/original\.jpg$/.test(args[1]));
  assert.equal('+append',args[3]);
  assert.equal('-',args[4]);

  if (!gm.integration) {
    return finish();
  }

  m
  .write(out, function (err) {
    if (err) return finish(err);
    gm(out).size(function (err, size) {
      if (err) return finish(err);
      assert.equal(697, size.width);
      assert.equal(155, size.height);

      finish();
    })
  });

}
