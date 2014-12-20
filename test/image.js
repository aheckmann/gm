
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {
  
  var img = __dirname + '/fixtures/iptc.jpg';
  var m = gm
  .drawImage('Multiply', 11, 22, 33, 44, img)
  .drawImage('Unknown', 11, 22, 33, 44, img);

  var args = m.args();
  assert.equal('convert', args[0]);
  args = args.slice(2)
  assert.deepEqual(args, [
    '-draw',
    'image Multiply 11,22 33,44 "' + img + '"',
    '-draw',
    'image Over 11,22 33,44 "' + img + '"',
    '-'
  ]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/image.png', function text (err) {
    finish(err);
  });
}
