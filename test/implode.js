
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .implode(0.8)
  .write(dir + '/implode.png', function implode (err) {
    finish(err);
  });
}
