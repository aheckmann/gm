
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .blur(8, 4)
  .stroke("red", 3)
  .fill("#ffffffbb")
  .drawPolyline([40, 10], [143, 153], [185, 53], [147, 15], [145, 17], [43, 19]);

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
    'polyline 40,10,143,153,185,53,147,15,145,17,43,19',
    '-'
  ])

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/polyline.png', function polyline (err) {
    finish(err);
  });
}
