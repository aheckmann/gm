var assert = require('assert')
var fs = require('fs')

module.exports = function (_, dir, finish, gm) {

  var original = dir + '/original.jpg';
  var result = dir + '/fromBuffer.png';

  var buf = fs.readFileSync(original);

  var m = gm(buf)
  .rotate('red', 30);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-', args[1]);
  assert.equal('-background', args[2]);
  assert.equal('red', args[3]);
  assert.equal('-rotate', args[4]);
  assert.equal(30, args[5]);

  if (!gm.integration)
    return finish();

  m
  .write(result, function crop (err) {
    if (err) return finish(err);

    // tolerance defaults to 0.4
    gm.compare(original, result, function (err, equal) {
      if (err) return finish(err);
      assert.ok(equal);

      // accepts tolerance argument
      gm.compare(original, result, 0.1, function (err, equal, equality, raw) {
        if (err) return finish(err);
        assert.ok(!equal);
        assert.ok(equality > 0.1);
        assert.ok(raw);
        finish();
      })
    })
  });
}
