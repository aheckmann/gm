const assert = require('assert');
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .comment("%m:%f %wx%h");

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-comment', args[2]);
  assert.equal('"%m:%f %wx%h"', args[3]);

  if (!GM.integration)
    return finish();

  const outpath = path.join(dir, 'comment.png');
  m.write(outpath, function comment (err) {
    finish(err);
  });
}
