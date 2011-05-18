
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .blur(18, 10)
  .write(dir + '/blur.png', function blur (err) {
    finish(err);
  });
}
