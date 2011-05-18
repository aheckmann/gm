
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .noise('laplacian')
  .write(dir + '/noise2.png', function noise2 (err) {
    finish(err);
  });
}
