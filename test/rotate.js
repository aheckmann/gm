
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .rotate('red', -40)
  .write(dir + '/rotate.png', function rotate (err) {
    finish(err);
  });
}
