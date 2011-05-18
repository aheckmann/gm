
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .colorize(80, 0, 30)
  .write(dir + '/colorize.png', function colorize (err) {
    finish(err);
  });
}
