const assert = require('assert');
const path = require('path');

module.exports = function (_, dir, finish, gm) {
  if (!gm.integration)
    return finish();

  var im = _._options.imageMagick;

  const iptcPath = path.join(__dirname, 'fixtures', 'iptc.jpg');
  var test = gm(iptcPath);
  if (im) test.options({ imageMagick: true });

  test.identify(function (err) {
    if (err) return finish(err);

    var d = this.data;

    if (im) {
      var iptc = d['Profiles'] && d['Profiles']['Profile-iptc'];
      assert.equal(iptc['Caption[2,120]'], 'Some caption with colon space: for example');
    }

    finish();
  });

}
