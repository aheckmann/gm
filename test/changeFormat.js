
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish, GM) {
  if (!GM.integration)
    return finish();

  gm
  .write(dir + '/changedformat.png', function changeformat (err) {
    finish(err);
  });
}
