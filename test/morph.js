
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  if (gm._options.imageMagick) return finish();

  gm
  .morph(dir + '/morpher.jpg', dir + '/morphed.jpg', function morph (err) {
    finish(err);
  });
}
