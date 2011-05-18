
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .monochrome()
  .dither()
  .write(dir + '/dither.png', function dither (err) {
    finish(err);
  });
}
