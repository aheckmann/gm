const assert = require('assert');
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .swirl(129);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-swirl', args[2]);
  assert.equal(129, args[3]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'swirl.png');
  m.write(destPath, function swirl (err) {
    finish(err);
  });
}
