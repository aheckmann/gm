
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .spread(12)
  .write(dir + '/spread.png', function spread (err) {
    finish(err);
  });
}
