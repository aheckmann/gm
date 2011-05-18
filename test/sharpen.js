
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .sharpen(19, 10)
  .write(dir + '/sharpen.png', function sharpen (err) {
    finish(err);
  });
}
