
var fs = require('fs');
var assert =require('assert')

module.exports = function (_, dir, finish, gm) {
  if (!gm.integration)
    return finish();

  gm(dir + '/original.gif[0]')
  .write(dir + '/gifFrame.jpg', function gifFrame (err){
    finish(err);
  });
}
