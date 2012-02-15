
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  if (!gm._options.imageMagick) return finish();

  gm
  .strip()
  .write(dir + '/edge.png', function edge (err) {
    finish(err);
  });
}
