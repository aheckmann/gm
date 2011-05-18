
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .despeckle()
  .write(dir + '/despeckle.png', function despeckle (err) {
    finish(err);
  });
}
