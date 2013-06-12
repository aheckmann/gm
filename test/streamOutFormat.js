
var assert = require('assert')
var fs = require('fs');

module.exports = function (gm, dir, finish, GM) {
  /*
  assert.throws(function () {
    gm.stream()
  }, /expects a callback/);

  assert.throws(function () {
    gm.stream('PNG')
  }, /expects a callback/);
  */

  if (!GM.integration)
    return finish();

  withCallback(function (err) {
    if (err) return finish(err);

    withoutCallback(function (err) {
      if (err) return finish(err);

      checkOutputFormat(finish);
    });
  });

  function withCallback(done) {
    gm
    .stream('PNG', function streamOut (err, stdout, stderr) {
      if (err) return done(err);
      stdout.pipe(fs.createWriteStream(dir + '/streamOut.png'));
      stdout.on('error', done);
      stdout.on('close', done);
    });
  }

  function withoutCallback(done) {
    var stream = gm.stream('PNG')
    stream.on('error', done)
    stream.pipe(fs.createWriteStream(dir + '/streamOut2.png'))
    stream.on('end', done)
  }

  function checkOutputFormat(done) {
    var stream = gm.stream('PNG')
    stream.on('error', done)
    GM(stream).format(function (err, value) {
      if (err)
        return done(err)

      assert.equal(value.toLowerCase(), 'png')
      done()
    })
  }
}
