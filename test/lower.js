
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .lower(10, 14)
  .write(dir + '/lower.png', function lower (err) {
    finish(err);
  });
}
