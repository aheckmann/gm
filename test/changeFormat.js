const path = require('path');

module.exports = function (gm, dir, finish, GM) {
  if (!GM.integration)
    return finish();

  const outpath = path.join(dir, 'changedformat.png');
  gm.write(outpath, function changeformat (err) {
    finish(err);
  });
}
