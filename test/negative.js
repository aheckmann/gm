
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .negative()
  .write(dir + '/negative.png', function negative (err) {
    finish(err);
  });
}
