var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  if (gm._options.imageMagick) return finish();

  if (!GM.integration)
    return finish();

  gm
    .morph([dir + '/morpher.jpg', dir + '/original.png'], dir + '/morphed2.jpg', function morph (err) {
      finish(err);
    });
}
