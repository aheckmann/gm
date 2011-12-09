
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

var fs = require('fs');

module.exports = function (_, dir, finish, gm) {
  
  gm(dir + '/original.gif[0]')
  .write(dir + '/gifFrame.jpg', function gifFrame (err){
    finish(err);
  });
}
