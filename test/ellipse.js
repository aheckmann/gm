
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .blur(8, 4)
  .stroke("blue", 1)
  .drawEllipse(155, 80, 130, 50)
  .write(dir + '/ellipse.png', function ellipse (err) {
    finish(err);
  });
}
