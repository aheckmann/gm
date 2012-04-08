
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .interlace()
  .write(dir + '/edge.png', function edge (err) {
    finish(err);
  });
}
