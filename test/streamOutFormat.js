const assert = require('assert')
const path = require('path');
const fs = require('fs');

module.exports = function (gm, dir, finish, GM, imageMagick) {
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
      const destPath = path.join(dir, 'streamOutFormat.png');
      stdout.pipe(fs.createWriteStream(destPath));
      stdout.on('error', done);
      stdout.on('close', done);
    });
  }

  function withoutCallback(done) {
    var stream = gm.stream('PNG')
    stream.on('error', done)
    const destPath = path.join(dir, 'streamOutFormat2.png');
    stream.pipe(fs.createWriteStream(destPath))
    stream.on('end', done)
  }

  function checkOutputFormat(done) {
    var stream = gm.stream('PNG')
    stream.on('error', done)
    GM(stream).options({imageMagick}).format(function (err, value) {
      if (err)
        return done(err)

      assert.equal(value.toLowerCase(), 'png')
      done()
    })
  }
}
