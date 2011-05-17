
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .blur(8, 4)
  .stroke("red", 3)
  .fill("#ffffffbb")
  .drawPolyline([40, 10], [143, 153], [185, 53], [147, 15], [145, 17], [43, 19])
  .write(dir + '/polyline.png', function polyline (err) {
    finish(err);
  });
}
