
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .chop(54, 1, 307, 1)
  .write(dir + '/chop.png', function chop (err) {
    finish(err);
  });
}
