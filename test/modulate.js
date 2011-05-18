
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .modulate(120, 100, 80)
  .write(dir + '/modulate.png', function modulate (err) {
    finish(err);
  });
}
