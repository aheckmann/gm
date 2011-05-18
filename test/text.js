
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .blur(8, 4)
  .fontSize(68)
  .stroke("#efe", 2)
  .fill("#888")
  .drawText(-20, 98, "graphics magick")
  .write(dir + '/text.png', function text (err) {
    finish(err);
  });
}
