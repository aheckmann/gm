
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .blur(8, 4)
  .stroke("red", 3)
  .fill("#ffffffbb")
  .drawPolygon([60, 10], [183, 73], [185, 13], [167, 35], [165, 17], [163, 19]);

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
    'polygon 60,10,183,73,185,13,167,35,165,17,163,19',
    '-'
  ])

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/polygon.png', function polygon (err) {
    finish(err);
  });
}
