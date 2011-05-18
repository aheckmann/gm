
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .equalize()
  .write(dir + '/equalize.png', function equalize (err) {
    finish(err);
  });
}
