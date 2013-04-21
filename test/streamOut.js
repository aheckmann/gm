
var fs = require('fs');

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
      stdout.pipe(fs.createWriteStream(dir + '/streamOut.png'));
      stdout.on('error', done);
      stdout.on('close', done);
    });
  }

  function withoutCallback(done) {
    var stream = gm.stream()
    stream.on('error', done)
    stream.pipe(fs.createWriteStream(dir + '/streamOut2.png'))
    stream.on('end', done)
  }
}
