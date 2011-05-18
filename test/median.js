
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .median(4)
  .write(dir + '/median.png', function media (err) {
    finish(err);
  });
}
