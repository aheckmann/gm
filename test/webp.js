var assert = require('assert')
var fs = require('fs')

module.exports = function (_, dir, finish, gm, im) {
  if (!gm.integration) return finish()

  // Don't know how to install IM with WEBP on ubuntu
  if (require('os').platform() === 'linux') return finish()

  // GraphicsMagick currently does not support webp :(
  if (!im) return finish()

  gm = gm.subClass({
    imageMagick: true
  })

  var image = dir + '/original.png'

  write(function (err) {
    if (err) return finish(err)

    stream(finish)
  })

  function write(done) {
    gm(image)
    .write(dir + '/original.x.webp', function (err) {
      if (err) return done(err)

      gm(dir + '/original.x.webp').identify(function (err, value) {
        if (err) return done(err)

        assert.ok(value)
        assert.equal(value.format, 'WEBP')
        done()
      })
    })
  }

  function stream(done) {
    gm(image)
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