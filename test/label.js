const assert = require('assert')
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .label("%m:%f %wx%h")

  var args= m.args();
  assert.equal('convert', args[0]);
  assert.equal('-label', args[2]);
  assert.equal('"%m:%f %wx%h"', args[3]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'label.png');
  m.write(destPath, function label (err) {
    finish(err);
  });
}
