
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  if (!GM.integration)
    return finish();

  gm
  .thumb(150, 40, dir + '/thumb.png', function thumb (err) {
    finish(err);
  });
}
