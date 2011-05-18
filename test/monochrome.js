
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .monochrome()
  .write(dir + '/monochrome.png', function monochrome (err) {
    finish(err);
  });
}
