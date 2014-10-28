
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {
  var a = GM("dummy").geometry("asdf"); // Custom geometry command
  var args = a.args();
  assert.equal('-geometry', args[2]);
  assert.equal('asdf', args[3]);

  var b = GM("dummy").geometry("", 100)
  var args = b.args();
  assert.equal('-geometry', args[2]);
  assert.equal('x100', args[3]); // Keep-aspect-ratio command

  if (!GM.integration)
    return finish();
}
