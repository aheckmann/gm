
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .raise(10,14)
  .write(dir + '/raise.png', function raise (err) {
    finish(err);
  });
}
