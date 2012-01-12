
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (_, dir, finish, gm) {

  // this image is sideways, but may be auto-oriented by modern OS's
  // try opening it in a browser to see its true orientation
  gm(dir + '/originalSideways.jpg')
  .autoOrient()
  .write(dir + '/autoOrient.jpg', function autoOrient (err) {
    finish(err);
  });
}
