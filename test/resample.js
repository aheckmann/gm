
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .resample(420, 120)
  .write(dir + '/resample.png', function resample (err) {
    finish(err);
  });
}
