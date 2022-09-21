const assert = require('assert');
const path = require('path');

module.exports = function (gm, dir, finish, GM) {
  const fixturesPath = path.join(__dirname, 'fixtures');
  const srcPath = path.join(fixturesPath, 'compare_1.png');

  gm.source = srcPath;
  const faviconPath = path.join(fixturesPath, 'favicon.png');
  var a = gm.montage(faviconPath);

  var args = a.args();
  assert.equal('montage', args[0]);
  assert.equal(faviconPath, args[1]);
  assert.equal(srcPath, args[2]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'montage.png');
  a.write(destPath, function(err) {
    finish(err);
  });
}
