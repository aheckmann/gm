const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  if (gm._options.imageMagick) return finish();

  if (!GM.integration)
    return finish();

  const morpherPath = path.join(dir, 'morpher.jpg');
  const morphedPath = path.join(dir, 'morphed.jpg');

  gm.morph(morpherPath, morphedPath, function morph (err) {
    finish(err);
  });
}
