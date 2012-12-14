
var assert = require('assert')
var fs = require('fs');

module.exports = function (_, dir, finish, gm) {
  if (!gm.integration)
    return finish();

  gm(fs.createReadStream(dir + '/original.jpg'), "original.jpg")
  .size({bufferStream: true}, function (err, size) {
    this.write(dir + '/streamInGetter.png', function streamInGetter (err){
      finish(err);
    });
  });
}
