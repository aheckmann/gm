const path = require('path');
const fs = require('fs');

module.exports = function (gm, dir, finish, GM) {

  if (!GM.integration)
    return finish();

  withCallback(function (err) {
    if (err) return finish(err);

    withoutCallback(finish);
  });

  function withCallback(done) {
    gm
    .stream(function streamOut (err, stdout, stderr) {
      if (err) return done(err);
      const destPath = path.join(dir, 'streamOut.png');
      stdout.pipe(fs.createWriteStream(destPath));
      stdout.on('error', done);
      stdout.on('close', done);
    });
  }

  function withoutCallback(done) {
    var stream = gm.stream()
    stream.on('error', done)
    const destPath = path.join(dir, 'streamOut2.png');
    stream.pipe(fs.createWriteStream(destPath))
    stream.on('end', done)
  }
}
