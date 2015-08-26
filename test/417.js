
var assert = require('assert')
var fs = require('fs');
var path = require('path');

module.exports = function (_, dir, finish, gm) {
  if (!gm.integration)
    return finish();

  gm(dir + '/original.jpg')
  .thumb(150, 40, dir + '/thumb.png', function thumb (err) {
    gm(dir + '/thumb.png')
      .size(function (err, size) {
        if (err) return finish(err);

        assert.equal(142, size.width);
        assert.equal(40, size.height);

        gm(dir + '/original.jpg')
        .thumbExact(150, 40, dir + '/thumb.png', function thumb (err) {
          gm(dir + '/thumb.png')
            .size(function (err, size) {
              assert.equal(150, size.width);
              assert.equal(40, size.height);
              finish(err);
            });
        });
      });
  });
}
