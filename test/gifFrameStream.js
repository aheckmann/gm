
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

var fs = require('fs');

module.exports = function (_, dir, finish, gm) {
  
  gm(fs.createReadStream(dir + '/original.gif'), "original.gif[0]")
  .write(dir + '/gifFrameStream.jpg', function gifFrame (err){
    finish(err);
  });
}
