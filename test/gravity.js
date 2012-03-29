module.exports = function (gm, dir, finish) {

  gm
  .scale(200, 100)
  .gravity("South")
  .extent(300,300)
  .write(dir + '/gravity.png', function resize (err) {
    finish(err);
  });
}
