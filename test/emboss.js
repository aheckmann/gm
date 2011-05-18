
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .emboss(2)
  .write(dir + '/emboss.png', function emboss (err) {
    finish(err);
  });
}
