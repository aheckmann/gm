
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  if (gm._options.imageMagick) return finish();

  if (!GM.integration)
    return finish();

  // todo, improve this api to allow multiple images

  gm
  .morph(dir + '/morpher.jpg', dir + '/morphed.jpg', function morph (err) {
    finish(err);
  });
}
