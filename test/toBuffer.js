var assert = require('assert');
var fs = require('fs');

module.exports = function (gm, dir, finish, GM) {

  if (!GM.integration)
    return finish();

  gm
  .toBuffer(function (err, buffer) {
    if (err) return finish(err);

    assert.ok(buffer instanceof Buffer);
    assert.ok(buffer.length);

    finish();
  })
}
