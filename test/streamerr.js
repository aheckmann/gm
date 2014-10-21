var assert = require('assert')

module.exports = function (_, dir, finish, gm) {
  var svg_file;
  svg_file = new Buffer('<svg viewBox="0 0 20 17" style="background-color:#ffffff00" xmlns="http://www.w3.org/2000/svg" width="20" height="17"><g fill="#656C72"><path d="M0 0h20v3h-20zM0 7h20v3h-20zM0 14h20v3h-20z"/></g></svg>', 'ascii');
  
  // The following invocation should fail, because 'convert' 
  // has no way of interpreting the file.
  gm(
    svg_file, 
    './test.svg' // fiction
    ).options({
      imageMagick: true
  }).setFormat('png').toBuffer(function(err, buffer) {
    assert.ok(err, "Expecting error on this buffer");
  });

  if (!gm.integration)
    return finish();

}
