
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .paint(2)
  .write(dir + '/paint.png', function paint (err) {
    finish(err);
  });
}
