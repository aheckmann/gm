var assert = require('assert')
var fs = require('fs');

module.exports = function (_, dir, finish, gm) {
  var m = gm(fs.createReadStream(dir + '/icon.ico'), 'icon.ico')

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('ico:-', args[1]);

  if (!gm.integration)
    return finish();

  m
  .size({bufferStream: true}, function (err, size) { 
    if (err) return finish(err);
    assert.equal(128, size.width);
    assert.equal(128, size.height);
    finish();
  });
}
