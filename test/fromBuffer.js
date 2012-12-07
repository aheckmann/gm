var assert = require('assert')
var fs = require('fs')

module.exports = function (_, dir, finish, gm) {

  var original = dir + '/original.jpg';
  var result = dir + '/fromBuffer.png';

  var buf = fs.readFileSync(original);

  gm(buf)
  .rotate('red', 30)
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
