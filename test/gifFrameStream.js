
var assert = require('assert')
var fs = require('fs');

module.exports = function (_, dir, finish, gm) {
  var m = gm(fs.createReadStream(dir + '/original.gif'), "original.gif[0]")

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-[0]', args[1]);

  if (!gm.integration)
    return finish();

  m
  .write(dir + '/gifFrameStream.jpg', function gifFrame (err){
    finish(err);
  });
}
