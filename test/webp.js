const assert = require('assert');
const path = require('path');
const fs = require('fs')

module.exports = function (_, dir, finish, gm, imageMagick) {
  if (!gm.integration) return finish()

  // Don't know how to install IM with WEBP on ubuntu
  // if (require('os').platform() === 'linux') return finish()

  // GraphicsMagick currently does not support webp :(
  // if (!im) return finish()

  gm = gm.subClass({
    imageMagick
  })

  const imagePath = path.join(dir, 'original.png');

  write(function (err) {
    if (err) return finish(err)

    stream(finish)
  })

  function write(done) {
    const webpPath = path.join(dir, 'original.x.webp');
    gm(imagePath)
    .write(webpPath, function (err) {
      if (err) return done(err)

      gm(webpPath).identify(function (err, value) {
        if (err) return done(err)

        assert.ok(value)
        assert.equal(value.format, 'WEBP')
        done()
      })
    })
  }

  function stream(done) {
    gm(imagePath)
    .stream('webp', function (err, stdout) {
      if (err) return done(err)

      gm(stdout).identify(function (err, value) {
        if (err) return done(err)

        assert.ok(value)
        assert.equal(value.format, 'WEBP')

        done()
      })
    })
  }
}