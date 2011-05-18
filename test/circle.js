
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .blur(8, 4)
  .stroke("red", 1)
  .fill("#ffffffbb")
  .drawCircle(125, 45, 120, 5)
  .write(dir + '/circle.png', function circle (err) {
    finish(err);
  });
}
