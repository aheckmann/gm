
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {
  return finish();

  gm
  .magnify()
  .write(dir + '/magnify.png', function magnify (err) {
    finish(err);
  });
}
