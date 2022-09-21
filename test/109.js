const fs = require('fs');
const path = require('path');

module.exports = function (_, dir, finish, gm, imageMagick) {
  if (!gm.integration) return finish();

  const original = path.join(dir, 'original.jpg');
  const buf = fs.readFileSync(original);
  const m = gm(buf, 'original.jpg').options({ imageMagick });

  m.identify(function (err, _) {
    finish(err);
  });

}
