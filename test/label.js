
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .label("%m:%f %wx%h")
  .write(dir + '/label.png', function label (err) {
    finish(err);
  });
}
