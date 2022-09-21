const assert = require('assert');
const path = require('path');

module.exports = function (gm, dir, finish, GM) {
  var m = gm.minify();

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-minify', args[1]);

  if(gm._options.imageMagick) {
    assert.throws(
      function() {
        const destPath = path.join(dir, 'minify.png');
        m.write(destPath, function minify (err) { throw err;})
      },
      Error
    );
  }
  return finish();

}