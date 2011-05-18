
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .blur(8, 4)
  .stroke("red", 3)
  .fill("#ffffffbb")
  .drawRectangle(40, 10, 251, 120)
  .drawRectangle(160, 10, 270, 220, 3)
  .write(dir + '/rectangle.png', function rectangle (err) {
    finish(err);
  });
}
