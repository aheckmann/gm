var assert = require('assert')
var fs = require('fs')

module.exports = function (_, dir, finish, gm, im) {
  if (!gm.integration) return finish()

  if (!im) {
    console.log('GraphicsMagick currently does not support webp :(')
    return finish()
  }

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
        console.log(value)
        assert.equal(value.format = 'webp')

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
        assert.equal(value.format = 'webp')

        done()
      })
    })
  }
}