
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = function (gm, dir, finish) {

  gm
  .limit("memory", "32MB")
  .limit("map", "64MB")
  .write(dir + '/limit.png', function limit (err) {
    finish(err);
  });
}
