
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .sepia()
  .write(dir + '/sepia.png', function sepia (err) {
    finish(err);
  });
}
