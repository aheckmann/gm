
var assert = require('assert')
var fs = require('fs');

module.exports = function (_, dir, finish, gm) {

  var stream = fs.createReadStream(dir + '/original.jpg');
  var m = gm(stream, "original.jpg");

  assert.equal(stream, m.sourceStream);
  assert.equal('original.jpg', m.source);

  if (!gm.integration)
    return finish();

  m
  .write(dir + '/streamIn.png', function streamIn (err) {
    finish(err);
  });
}
