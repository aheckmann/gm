
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .bitdepth(2)
  .write(dir + '/bitdepth.png', function bitdepth (err) {
    finish(err);
  });
}
