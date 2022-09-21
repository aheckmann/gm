const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  if (gm._options.imageMagick) return finish();

  if (!GM.integration)
    return finish();

  const morpherPath = path.join(dir, 'morpher.jpg');
  const originalPath = path.join(dir, 'original.png');
  const morphedPath = path.join(dir, 'morphed2.jpg');

  gm
    .morph([morpherPath, originalPath], morphedPath, function morph (err) {
      finish(err);
    });
}
