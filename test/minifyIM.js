
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {
  if(!gm._options.imageMagick) return finish();
  var m = gm.minify();

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-minify', args[1]);

  assert.throws(
    function() {
      m.write(dir + '/minify.png', function minify (err) { throw err;})
    },
    Error
  );
  return finish();  

}