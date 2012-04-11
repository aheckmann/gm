module.exports = function (gm, dir, finish) {

  gm
  .crop(140,100)
  .background("#FF0000")
  .extent(340,300)
  .write(dir + '/background.jpg', function (err) {
    finish(err);
  });
}
