
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .scale(100, 100)
  .write(dir + '/scale.png', function scale (err) {
    finish(err);
  });
}
