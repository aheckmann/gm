
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (_, dir, finish, gm) {

  gm(525, 110, "#00ff55aa")
  .fontSize(68)
  .stroke("#efe", 2)
  .fill("#555")
  .drawText(20, 72, "graphics")
  .fill("#fa0")
  .drawText(274, 72, " magick")
  .write(dir + '/new.png', function New (err){
    finish(err);
  });
}
