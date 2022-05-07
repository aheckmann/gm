const gm = require("./index").subClass({
  imageMagick: true,
  app: String.raw`C:\Program Files\ImageMagick-7.1.0-Q16-HDRI\magick.exe`,
});
const path = require("path");

const img1 = path.join(__dirname, "test/fixtures", "compare_1.png");
const img2 = path.join(__dirname, "test/fixtures", "compare_2.png");
gm(img1)
  .montage(img2)
  .geometry("+100+150")
  .write("./montage.png", function (err) {
    console.log(err);
    if (!err) console.log("Written montage image.");
  });
