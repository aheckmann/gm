
module.exports = function (gm, dir, finish) {

  gm
  .thumbnail(200, 200)
  .write(dir + '/thumbnail.png', function thumbnail (err) {
    finish(err);
  });
}
