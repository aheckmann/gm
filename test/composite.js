module.exports = function (gm, dir, finish) {
  gm
  .composite(dir + "/morpher.jpg", null, dir + '/composite_output.png', function composite (err) {
    finish(err);
  });
}
