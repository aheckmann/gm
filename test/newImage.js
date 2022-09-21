// https://github.com/aheckmann/gm/issues/127

const path = require('path');
const fs = require('fs')

module.exports = function (_, dir, finish, gm, imageMagick) {
  if (!gm.integration)
    return finish();

  const dest1Path = path.join(dir, 'ignore.me.png');
  createImage().write(dest1Path, function (err) {
    if (err) return finish(err);

    createImage().stream(function (err, stdout) {
      if (err) return finish(err);

      const dest2Path = path.join(dir, 'ignore.me.2.png');
      stdout.pipe(fs.createWriteStream(dest2Path))

      stdout.on('error', finish)
      stdout.on('end', finish)
    })
  })

  function createImage() {
    return gm(70, 30, '#000')
      .options({imageMagick})
      .font("arial", 20)
      .stroke("#fff", 2)
      .fill("#888")
      .drawText(10, 22, 'Some text')
  }
}
