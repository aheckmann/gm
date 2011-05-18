
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .noise(0.3)
  .write(dir + '/noise1.png', function noise1 (err) {
    finish(err);
  });
}
