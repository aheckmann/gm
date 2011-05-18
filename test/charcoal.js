
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .charcoal(1)
  .write(dir + '/charcoal.png', function charcoal (err) {
    finish(err);
  });
}
