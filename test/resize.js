
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .resize(58, 50, '%')
  .write(dir + '/resize.png', function resize (err) {
    finish(err);
  });
}
