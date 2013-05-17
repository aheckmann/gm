
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .blur(8, 4)
  .stroke("red", 3)
  .fill("#ffffffbb")
  .drawRectangleMulti(new Array(new Array(40, 10, 251, 120), new Array(160, 10, 270, 220)));

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
    'rectangle 160,10 270,220 ',
    '-'
   ])

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/rectangleMulti.png', function rectangleMulti (err) {
    finish(err);
  });
}
