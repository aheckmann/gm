
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)
var assert = require('assert')
var url = require('url')
var http = require('http')

module.exports = function (_, dir, finish, gm) {
  return finish();

  // use this test when gm is not installed.
  // it demonstrates that err is often passed as null (timing)
  // to detect the stream error that the gm command is not installed,
  //   you must test the stderr output manually for "execvp(): No such file or directory"

  function done (err){
    if (err) return finish(done.ran = err);
    if (done.ran) return;
    finish();
  }

  http.get(url.parse('http://www.google.com/images/srpr/logo3w.png'), function (resp) {
    gm(resp, 'logo3w.png').stream(function (err, stdout, stderr) {
      return finish();

      if (err) {
        console.error('Error processing image', err)
      } else {
        stdout.on('data', function (chunk) {
          console.log('Chunk recieved', chunk.toString())
        })
        stdout.on('end', function () {
          console.log('Stream ended')
        })
        stderr.on('data', function (chunk) {
          console.log('err Chunk recieved', chunk.toString())
        })
        stderr.on('end', function () {
          console.log('err Stream ended')
        })
      }
    })
  })
  .on('error', function (err) {
    console.error('Error fetching image', err)
  })

}
