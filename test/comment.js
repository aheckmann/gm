
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .comment("%m:%f %wx%h");

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-comment', args[2]);
  assert.equal('"%m:%f %wx%h"', args[3]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/comment.png', function comment (err) {
    finish(err);
  });
}
