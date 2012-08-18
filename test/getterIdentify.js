
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

var assert = require('assert')

module.exports = function (_, dir, finish, gm) {
  var im = _._options.imageMagick;

  var test = gm(dir + '/photo.JPG');
  if (im) test.options({ imageMagick: true });
  test.identify(function (err) {
    if (err) return finish(err);

    var d = this.data;

    if (im) {
      assert.equal(d.Orientation, 'TopLeft');
      assert.equal(d['Quality'], 96);
      assert.equal(d['Geometry'], '430x488+0+0');
      assert.equal(d['Print size'], '5.97222x6.77778');
      assert.equal(d['Channel depth'].red, '8-bit');
      assert.equal(d['Channel depth'].green, '8-bit');
      assert.equal(d['Channel statistics'].Red.min, '0 (0)');
      assert.equal(d['Channel statistics'].Red['standard deviation'], '71.7079 (0.281208)');
      assert.equal(d['Image statistics'].Overall.kurtosis, '-1.09331');
      assert.equal(d['Rendering intent'], 'Perceptual');
      assert.equal(d.Properties['date:create'], '2012-07-29T15:48:42-07:00');
      assert.equal(d.Properties['exif:DateTimeDigitized'], '2011:07:01 11:23:16');

    } else {
      assert.equal(d.Orientation, 'TopLeft');
      assert.equal(d['JPEG-Quality'], 96);
      assert.ok(/(0.2812)/.test(d['Channel Statistics'].Red['Standard Deviation']));

      var ex = d['Profile-EXIF'];
      assert.equal(ex.Make, 'Apple');
      assert.equal(ex.Model, 'iPad 2');
      assert.equal(ex['GPS Info'], 558);
      assert.equal(ex['GPS Longitude'], '80/1,4970/100,0/1');
      assert.equal(ex['GPS Time Stamp'], '15/1,23/1,945/1');
    }

    finish();
  });
}
