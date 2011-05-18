
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .comment("%m:%f %wx%h")
  .write(dir + '/comment.png', function comment (err) {
    finish(err);
  });
}
