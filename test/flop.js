
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .flop()
  .write(dir + '/flop.png', function flop (err) {
    finish(err);
  });
}
