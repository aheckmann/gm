
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .thumb(150, 40, dir + '/thumb.png', function thumb (err) {
    finish(err);
  });
}
