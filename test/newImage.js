// https://github.com/aheckmann/gm/issues/127

var assert = require('assert')
var fs = require('fs')

module.exports = function (_, dir, finish, gm) {
  if (!gm.integration)
    return finish();

  createImage().write(dir + '/ignore.me.png', function (err) {
    if (err) return finish(err);

    createImage().stream(function (err, stdout) {
      if (err) return finish(err);

      stdout.pipe(fs.createWriteStream(dir + '/ignore.me.2.png'))

      stdout.on('error', finish)
      stdout.on('end', finish)
    })
  })

  function createImage() {
    return gm(70, 30, '#000')
      .font("arial", 20)
      .stroke("#fff", 2)
      .fill("#888")
      .drawText(10, 22, 'Some text')
  }
}
