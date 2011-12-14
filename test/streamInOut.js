
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

var fs = require('fs');

module.exports = function (_, dir, finish, gm) {

  gm(fs.createReadStream(dir + '/original.jpg'), "original.jpg")
  .stream(function streamOut (err, stdout, stderr) {
    if (err) return finish(err);
    stdout.pipe(fs.createWriteStream(dir + '/streamInOut.jpg'));
    stdout.on('error', finish);
    stdout.on('close', finish);
  });
}
