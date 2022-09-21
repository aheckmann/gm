const assert = require('assert');
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  if (gm._options.imageMagick)
    return finish();

  var m = gm
  .magnify();

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-magnify', args[1]);
  assert.equal(4, args.length);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'magnify.png');
  m.write(destPath, function magnify (err) {
    finish(err);
  });
}
