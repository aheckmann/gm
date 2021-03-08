'use strict';

//https://github.com/aheckmann/gm/issues/820
var assert = require('assert');
var fs = require('fs');
var path = require('path');

module.exports = function (_, dir, finish, gm) {
  if (!gm.integration)  return finish();

  var imagePath = path.join(__dirname, './fixtures/synthetic_invalid.pdf');
  var inputStream = fs.createReadStream(imagePath);
  gm(inputStream)
    .size({ bufferStream: true }, function(err, size) {
      if (err) return finish(err);
      assert.equal(612, size.width);
      assert.equal(792, size.height);
      finish();
    });
}
