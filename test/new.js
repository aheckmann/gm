
var assert = require('assert')

module.exports = function (_, dir, finish, gm) {

  var m = gm(525, 110, "#00ff55aa")
  .fontSize(68)
  .stroke("#efe", 2)
  .fill("#555")
  .drawText(20, 72, "graphics")
  .fill("#fa0")
  .drawText(274, 72, " magick");

  var args = m.args();
  assert.deepEqual(args, [
    'convert',
    '-size',
    '525x110',
    'xc:#00ff55aa',
    '-pointsize',
    68,
    '-strokewidth',
    2,
    '-stroke',
    '#efe',
    '-fill',
    '#555',
    '-draw',
    'text 20,72 "graphics"',
    '-fill',
    '#fa0',
    '-draw',
    'text 274,72 "magick"',
    '-'
  ])

  if (!gm.integration)
    return finish();

  m
  .write(dir + '/new.png', function New (err){
    finish(err);
  });
}
