const assert = require('assert');
const path = require('path');

module.exports = function (_, dir, finish, gm, imageMagick) {
  if (!gm.integration) return finish();

  var name = imageMagick ? '78-IM' : '78';
  var out = path.join(dir, name);

  _.resize(600, 450, '!').write(out + '.png', function (err) {
    if (err) return finish(err);

    var img = gm(out + '.png').options({ imageMagick });

    img
    .crop(70, 70, 100, 100)
    .resize(50, 50)
    .write(out + '-2.jpg', function (err) {
      if (err) return finish(err);
      finish();
    })
  });

}
