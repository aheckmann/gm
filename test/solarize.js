
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .solarize(68.5)
  .write(dir + '/solarize.png', function solarize (err) {
    finish(err);
  });
}
