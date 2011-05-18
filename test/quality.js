
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .quality(5)
  .write(dir + '/quality.png', function quality (err) {
    finish(err);
  });
}
