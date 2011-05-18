
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .cycle(4)
  .write(dir + '/cycle.png', function cycle (err) {
    finish(err);
  });
}
