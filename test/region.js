
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .region(130, 170, 307, 00)
  .write(dir + '/region.png', function region (err) {
    finish(err);
  });
}
