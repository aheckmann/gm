
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

var fs = require('fs');

module.exports = function (_, dir, finish, gm) {

  gm(fs.createReadStream(dir + '/original.jpg'), "original.jpg")
  .size({bufferStream: true}, function (err, size) {
    this.write(dir + '/streamInGetter.png', function streamInGetter (err){
      finish(err);
    });
  });
}
