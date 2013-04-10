
var assert = require('assert')
var fs = require('fs');

module.exports = function (_, dir, finish, gm) {
  if (!gm.integration)
    return finish();

  var imageStream = fs.createReadStream(dir + '/original.jpg')

  var buffers = []
  imageStream.on('data', function (chunk) {
    buffers.push(chunk)
  })

  gm(imageStream)
  .size(function (err, size) {
    gm(Buffer.concat(buffers)).write(dir + '/streamInGetter.png', function streamInGetter (err){
      finish(err);
    });
  });
}
