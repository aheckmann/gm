
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .blur(8, 4)
  .stroke("red", 3)
  .fill("#ffffffbb")
  .drawBezier([0, 10], [183, 163], [183, 10], [0, 10])
  .write(dir + '/bezier.png', function bezier (err) {
    finish(err);
  });
}
