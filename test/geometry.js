
var assert = require('assert')

module.exports = function (_, __, finish, GM, imageMagick) {
  var a = GM("dummy").options({imageMagick}).geometry("asdf"); // Custom geometry command
  var args = a.args();
  assert.equal('-geometry', args[2]);
  assert.equal('asdf', args[3]);

  var b = GM("dummy").options({imageMagick}).geometry("", 100);
  var args = b.args();
  assert.equal('-geometry', args[2]);
  assert.equal('x100', args[3]); // Keep-aspect-ratio command

  return finish();
}
