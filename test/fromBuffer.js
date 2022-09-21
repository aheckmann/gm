const assert = require('assert');
const path = require('path');
const fs = require('fs')

module.exports = function (_, dir, finish, gm, imageMagick) {

  const original = path.join(dir, 'original.jpg');
  const result = path.join(dir, 'fromBuffer.png');

  var buf = fs.readFileSync(original);

  var m = gm(buf).options({imageMagick}).rotate('red', 30);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-', args[1]);
  assert.equal('-background', args[2]);
  assert.equal('red', args[3]);
  assert.equal('-rotate', args[4]);
  assert.equal(30, args[5]);

  if (!gm.integration)
    return finish();

  m.write(result, function crop (err) {
    if (err) return finish(err);

    // tolerance defaults to 0.4
    m.compare(original, result, function (err, equal) {
      if (err) return finish(err);
      assert.ok(equal);

      // accepts tolerance argument
      m.compare(original, result, 0.1, function (err, equal, equality, raw) {
        if (err) return finish(err);
        assert.ok(!equal);
        assert.ok(equality > 0.1);
        assert.ok(raw);
        finish();
      })
    })
  });
}
