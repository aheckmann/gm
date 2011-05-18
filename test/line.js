
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .blur(8, 4)
  .stroke("red", 3)
  .drawLine(20, 10, 50, 40)
  .write(dir + '/line.png', function line (err) {
    finish(err);
  });
}
