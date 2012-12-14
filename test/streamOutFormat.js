
var assert = require('assert')
var fs = require('fs');

module.exports = function (gm, dir, finish, GM) {
  assert.throws(function () {
    gm.stream()
  }, /expects a callback/);

  assert.throws(function () {
    gm.stream('PNG')
  }, /expects a callback/);

  if (!GM.integration)
    return finish();

  gm
  .stream('PNG', function streamOut (err, stdout, stderr) {
    if (err) return finish(err);
    stdout.pipe(fs.createWriteStream(dir + '/streamOut.png'));
    stdout.on('error', finish);
    stdout.on('close', finish);
  });
}
