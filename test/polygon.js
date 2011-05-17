
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .blur(8, 4)
  .stroke("red", 3)
  .fill("#ffffffbb")
  .drawPolygon([60, 10], [183, 73], [185, 13], [167, 35], [165, 17], [163, 19])
  .write(dir + '/polygon.png', function polygon (err) {
    finish(err);
  });
}
