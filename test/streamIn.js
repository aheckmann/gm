
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

var fs = require('fs');

module.exports = function (_, dir, finish, gm) {

  gm(fs.createReadStream(dir + '/original.jpg'), "original.jpg")
  .write(dir + '/streamIn.png', function streamIn (err) {
    finish(err);
  });
}
