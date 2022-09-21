
const assert = require('assert')
const path = require('path');

var times = 16;
var loading = path.join(__dirname, 'fixtures', 'loading.gif');
var favicon = path.join(__dirname, 'fixtures', 'favicon.png');

module.exports = function (_, dir, finish, gm, imageMagick) {
  if (!gm.integration) return finish();

  var pending = times/2;

  var res = {};
  res[loading] = {};
  res[favicon] = {};

  function done (err){
    if (err) return finish(done.ran = err);
    if (done.ran) return;
    if (--pending) return;
    finish();
  }

  new Array(times).join('x').split('x').forEach(function (_, i) {
    ;[loading, favicon].forEach(function (img) {
      gm(img).options({imageMagick}).size(function (err, size) {
        if (err) return done(err);

        'width height'.split(' ').forEach(function (prop) {
          if (!(prop in res[img])) {
            res[img][prop] = size[prop];
          } else {
            assert.equal(res[img][prop], size[prop]);
          }
        });

        done(err);
      });
    });
  });

}
