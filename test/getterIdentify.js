const assert = require('assert');
const path = require('path');
const os = require('os')

var isLinux = os.platform() === 'linux'
// Be more lax with the errors if we're on linux
var errorFactor = isLinux ? 10 : 1.1

module.exports = function (_, dir, finish, gm, imageMagick) {
  if (!gm.integration)
    return finish();

  const photoPath = path.join(dir, 'photo.JPG');
  var test = gm(photoPath).options({ imageMagick });

  test.identify(function (err) {
    if (err) return finish(err);

    var d = this.data;

    if (imageMagick) {
      assert.equal(d.Orientation, 'TopLeft');
      assert.equal(d['Geometry'], '430x488+0+0');
      assert.equal(d['Print size'], '5.97222x6.77778');
      assert.ok(d['Channel depth'].Red || d['Channel depth'].red);
      assert.ok(d['Channel depth'].Green || d['Channel depth'].green);
      assert.ok(/0\s+\(0\)/.test(d['Channel statistics'].Red.min));

      var sd = d['Channel statistics'].Red['standard deviation'].split(' ')
      var sd1 = parseFloat(sd[0])
      var sd2 = parseFloat(sd[1].slice(1, -1))
      assert.ok(sd1 && Math.abs(sd1 - 71.7079) < .01 * errorFactor)
      assert.ok(sd2 && Math.abs(sd2 - 0.281208) < .001 * errorFactor)

      var imageStat = parseFloat(d['Image statistics'].Overall.kurtosis)
      assert.ok(imageStat);

      if (!isLinux) {
        // This is undefined in Linux
        assert.equal(d['Rendering intent'], 'Perceptual');
      }
      assert.equal(d.Properties['exif:DateTimeDigitized'], '2011:07:01 11:23:16');
      assert.equal(d.Format, 'JPEG (Joint Photographic Experts Group JFIF format)');

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
      assert.equal(d.Format, 'JPEG (Joint Photographic Experts Group JFIF format)');
      assert.equal(d['Geometry'], '430x488');
    }

    gif(function () {
      pattern();
    });
  });

  function gif (callback) {
    const bluePath = path.join(dir, 'blue.gif');
    var test = gm(bluePath).options({ imageMagick });

    test.identify(function (err) {
      if (err) return finish(err);

      if (imageMagick) {
        if (!isLinux) {
          assert.equal(1, this.data.color);
        }

        assert.ok(/blue/.test(this.data.Colormap['0']));
        assert.ok(/black/.test(this.data.Colormap['1']));

      } else {
        if (!isLinux) {
          assert.equal(2, this.data.color);
        }

        var blueWorks = this.data.Colors['0'] == '(  0,  0,255)\t  blue';
        var blackWorks = this.data.Colors['1'] == '(  0,  0,  0)\t  black';

        if (!blueWorks) {
          blueWorks = this.data.Colors['1'] == '(  0,  0,255)\t  blue';
          blackWorks = this.data.Colors['0'] == '(  0,  0,  0)\t  black';
        }

        assert.ok(blueWorks);
        assert.ok(blackWorks);
      }

      callback();
    });
  }

  function pattern () {
    const bluePath = path.join(dir, 'blue.gif');
    var test = gm(bluePath);
    var format = '%f: %m, %wx%h';
    var value = 'blue.gif: GIF, 100x200';

    test.options({ imageMagick });

    test.identify(format, function (err, result) {
      if (err) return finish(err);

      assert.equal(result, value);

      test.identify({
        format: format
      }, function (err, result) {
        if (err) return finish(err);

        assert.equal(result, value);

        finish();
      })
    });
  }
}
