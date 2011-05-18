
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .contrast(2)
  .write(dir + '/contrast.png', function contrast (err) {
    finish(err);
  });
}
