
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .flip()
  .write(dir + '/flip.png', function flip (err) {
    finish(err);
  });
}
