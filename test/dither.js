
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  var g = gm.monochrome()

  if (!g._options.imageMagick) {
    g.dither()
  }

  g.write(dir + '/dither.png', function dither (err) {
    finish(err);
  });
}
