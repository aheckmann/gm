
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .colors(16)
  .write(dir + '/colors.png', function colors (err) {
    finish(err);
  });
}
