var assert = require('assert')
var fs = require('fs')

module.exports = function (_, dir, finish, gm) {
  if (!gm.integration)
    return finish();

  var original = dir + '/original.jpg';
  var result = dir + '/fromBuffer.png';

  var buf = fs.readFileSync(original);
  var m = gm(buf, 'original.jpg');

  m.identify(function (err, x) {
    finish(err);
  });

}
