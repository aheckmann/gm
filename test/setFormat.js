
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .setFormat('png');

  assert.equal('png', m._outputFormat);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/setformat', function setformat (err) {
    finish(err);
  });
}
