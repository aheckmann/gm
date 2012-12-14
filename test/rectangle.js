
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .blur(8, 4)
  .stroke("red", 3)
  .fill("#ffffffbb")
  .drawRectangle(40, 10, 251, 120)
  .drawRectangle(160, 10, 270, 220, 3);

  var args = m.args();
  assert.equal('convert', args[0]);
  args = args.slice(2);
  assert.deepEqual(args, [
    '-blur',
    '8x4',
    '-strokewidth',
    3,
    '-stroke',
    'red',
    '-fill',
    '#ffffffbb',
    '-draw',
    'rectangle 40,10 251,120 ',
    '-draw',
    'roundRectangle 160,10 270,220 3,3',
    '-'
   ])

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/rectangle.png', function rectangle (err) {
    finish(err);
  });
}
