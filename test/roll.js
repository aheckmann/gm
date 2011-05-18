
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .roll(40,-100)
  .write(dir + '/roll.png', function roll (err) {
    finish(err);
  });
}
