
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

var assert = require('assert')

module.exports = function (_, dir, finish, gm) {

  gm(dir + '/photo.JPG').identify(function (err) {
    if (err) return finish(err);

    var d = this.data;

    assert.equal(d.Orientation, 'TopLeft');
    assert.equal(d['JPEG-Quality'], 96);
    assert.equal(d['Channel Statistics'].Red['Standard Deviation'], '71.70 (0.2812)');

    var ex = d['Profile-EXIF'];
    assert.equal(ex.Make, 'Apple');
    assert.equal(ex.Model, 'iPad 2');
    assert.equal(ex['GPS Info'], 558);
    assert.equal(ex['GPS Longitude'], '80/1,4970/100,0/1');
    assert.equal(ex['GPS Time Stamp'], '15/1,23/1,945/1');

    finish();
  });
}
