const assert = require('assert')
const path = require('path');

module.exports = function (_, dir, finish, gm, imageMagick) {
  const out = path.resolve(dir, 'append.jpg');
  const lostPath = path.join(dir, 'lost.png');
  const originalPath = path.join(dir, 'original.jpg');

  try {
    require('fs').unlinkSync(out);
  } catch (_) {}

  var m = gm(lostPath)
  .options({imageMagick})
  .append(originalPath, originalPath)
  .append()
  .background('#222')

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-background',args[1]);
  assert.equal('#222',args[2]);
  assert.ok(/lost\.png$/.test(args[3]));
  assert.ok(/original\.jpg$/,args[4]);
  assert.ok(/original\.jpg$/,args[5]);
  assert.equal('-append',args[6]);
  assert.equal('-',args[7]);

  if (!gm.integration) {
    return horizontal({ dir, finish, gm, originalPath, lostPath, imageMagick });
  }

  m.write(out, function (err) {
    if (err) return finish(err);
    gm(out)
    .options({imageMagick})
    .size(function (err, size) {
      if (err) return finish(err);
      assert.equal(460, size.width);
      assert.equal(435, size.height);

      horizontal({ dir, finish, gm, originalPath, lostPath, imageMagick });
    })
  });
}

function horizontal ({ dir, finish, gm, originalPath, lostPath, imageMagick }) {
  var out = path.resolve(dir, 'appendHorizontal.jpg');

  var m = gm(originalPath).append(lostPath, true).options({imageMagick});

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.ok(/original\.jpg$/.test(args[1]));
  assert.ok(/lost\.png$/.test(args[2]));
  assert.equal('+append',args[3]);
  assert.equal('-',args[4]);

  if (!gm.integration) {
    return finish();
  }

  m.write(out, function (err) {
    if (err) return finish(err);
    gm(out).options({imageMagick}).size(function (err, size) {
      if (err) return finish(err);
      assert.equal(697, size.width);
      assert.equal(155, size.height);

      finish();
    })
  });

}
