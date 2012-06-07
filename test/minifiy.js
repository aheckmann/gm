
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {
  if (gm._options.imageMagick) return finish();

  gm
  .minify()
  .write(dir + '/minify.png', function minify (err) {
    finish(err);
  });
}
