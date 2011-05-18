
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .blur(8, 4)
  .stroke("red", 3)
  .fill("#ffffffbb")
  .drawArc(80, 10, 90, 20, 0, 180)
  .write(dir + '/arc.png', function arc (err) {
    finish(err);
  });
}
