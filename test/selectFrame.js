var assert = require('assert');
var fs = require('fs')

module.exports = function (_, dir, finish, gm) {
  var m = gm(dir + '/original.gif[0]')

  if (!gm.integration)
    return finish();

  m.identify('%#', function (err, hash1) {
    if (err) return finish(err);

    m.selectFrame(2).identify('%#', function (err, hash2) {
      if (err) return finish(err);

      assert.ok(hash1.toString().trim() !== hash2.toString().trim())
      finish();
    })
  })
}