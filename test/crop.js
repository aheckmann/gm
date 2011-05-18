
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .crop(200, 155, 300, 0)
  .write(dir + '/crop.png', function crop (err) {
    finish(err);
  });
}
