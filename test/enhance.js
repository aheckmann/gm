
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .enhance()
  .write(dir + '/enhance.png', function enhance (err) {
    finish(err);
  });
}
