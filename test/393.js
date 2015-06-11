'use strict';

var assert = require('assert');
var fs = require('fs');
var path = require('path');

module.exports = function (_, dir, finish, gm) {
  if (!gm.integration)  return finish();

  var imagePath = path.join(__dirname, './fixtures/nyancat.gif');
  var inputStream = fs.createReadStream(imagePath);
  gm(inputStream)
    .identify({ bufferStream: true }, function(err, value) {
      if (err) return finish(err);
      var size = value.size;
      assert.equal(400, size.width);
      assert.equal(400, size.height);
      finish();
    });
}
