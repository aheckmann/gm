
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .swirl(129);

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-swirl', args[2]);
  assert.equal(129, args[3]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/swirl.png', function swirl (err) {
    finish(err);
  });
}
