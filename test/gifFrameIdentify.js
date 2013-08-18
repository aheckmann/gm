
var assert = require('assert')
var fs = require('fs');

module.exports = function (_, dir, finish, gm) {
  var m = gm(dir + '/original.gif[0]')

  if (!gm.integration)
    return finish();

  m.identify('%n', function (err, stdout) {
    if (err) return finish(err);

    assert.equal(parseInt(stdout.toString(), 10), 1);
    finish();
  })
}
