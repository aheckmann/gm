
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .setFormat('png')
  .write(dir + '/setformat', function setformat (err) {
    finish(err);
  });
}
