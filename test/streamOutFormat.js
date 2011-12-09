
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

var fs = require('fs');

module.exports = function (gm, dir, finish) {
  
  gm
  .stream('PNG', function streamOut (err, stdout, stderr){
    stdout.pipe(fs.createWriteStream(dir + '/streamOut.png'));
    stdout.addListener('close', function() {
      finish(err);
    });
  });
}
