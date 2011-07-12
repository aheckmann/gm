
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .crop(200, 155, 300, 0)
  .resize(58, 50, '%')
  .write(dir + '/cropresize.png', function crop (err) {
    finish(err);
  });
}
