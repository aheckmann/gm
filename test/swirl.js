
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .swirl(129)
  .write(dir + '/swirl.png', function swirl (err) {
    finish(err);
  });
}
