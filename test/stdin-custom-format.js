
var assert = require('assert')
var fs = require('fs');

module.exports = function (_, dir, finish, gm) {

  var stream = fs.createReadStream(dir + '/jongleberries.png');
  var m = gm(stream, 'PNG32:-');

  assert.equal(stream, m.sourceStream);
  assert.equal('PNG32:-', m.source);

  if (!gm.integration)
    return finish();

  m
  .write(dir + '/jongleberries.out.png', function streamIn (err) {
    finish(err);
  });
}
