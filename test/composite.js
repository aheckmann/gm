const assert = require('assert')
const path = require('path');

module.exports = function (gm, dir, finish, GM) {
  const sourcePath = path.join(__dirname, 'fixtures', 'compare_1.png');
  gm.source = sourcePath;

  const faviconPath = path.join(__dirname, 'fixtures', 'favicon.png');
  const a = gm.composite(faviconPath)

  const args = a.args();
  assert.equal('composite', args[0]);
  assert.equal(faviconPath, args[1]);
  assert.equal(sourcePath, args[2]);

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'composite.png');
  a.write(destPath, function(err) {
    finish(err);
  });
}
