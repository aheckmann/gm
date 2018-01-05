
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .setInputFormat('jpeg');

  assert.equal('jpeg', m._inputFormat);

  assert.deepEqual(m.args(), [
    'convert',
    'jpeg:' + dir + '/original.jpg',
    '-'
  ]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/setInputformat', function setInputformat (err) {
    finish(err);
  });
}
