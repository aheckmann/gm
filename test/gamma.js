
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .gamma(1.7, 2.3, 1.3)
  .write(dir + '/gamma.png', function gamma (err) {
    finish(err);
  });
}
