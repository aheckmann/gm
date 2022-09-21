const assert = require('assert');
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  if (!GM.integration)
    return finish();

  const destPath = path.join(dir, 'thumb.png');
  gm.thumb(150, 40, destPath, function thumb (err) {
    finish(err);
  });
}
