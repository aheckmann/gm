const assert = require('assert');
const path = require('path');

module.exports = function (_, dir, finish, gm, imageMagick) {

  var m = gm(525, 110, "#00ff55aa")
  .options({imageMagick})
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

  const destPath = path.join(dir, 'new.png');
  m.write(destPath, function New (err){
    finish(err);
  });
}
