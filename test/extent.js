module.exports = function (gm, dir, finish) {

  gm
  .scale(200, 100)
  .extent(300,300)
  .write(dir + '/extent.png', function resize (err) {
    finish(err);
  });
}
