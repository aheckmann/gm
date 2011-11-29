
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

var fs = require('fs');

module.exports = function (_, dir, finish, gm) {
  
  gm(fs.createReadStream(dir + '/original.jpg'), "original.jpg")
  .stream(function streamOut (err, stdout, stderr){
    stdout.pipe(fs.createReadStream(dir + '/streamInOut.jpg'));
    stdout.addListener('close', function() {
      finish(err);
    });
  });
  
}
