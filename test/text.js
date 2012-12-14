
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .blur(8, 4)
  .fontSize(68)
  .stroke("#efe", 2)
  .fill("#888")
  .drawText(-20, 98, "graphics magick");

  var args = m.args();
  assert.equal('convert', args[0]);
  args = args.slice(2)
  assert.deepEqual(args, [
   '-blur',
    '8x4',
    '-pointsize',
    68,
    '-strokewidth',
    2,
    '-stroke',
    '#efe',
    '-fill',
    '#888',
    '-draw',
    'text -20,98 "graphics magick"',
    '-'
  ]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/text.png', function text (err) {
    finish(err);
  });
}
