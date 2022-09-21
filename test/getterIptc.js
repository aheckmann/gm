const assert = require('assert');
const path = require('path');

module.exports = function (_, dir, finish, gm, imageMagick) {
  if (!gm.integration)
    return finish();

  const iptcPath = path.join(__dirname, 'fixtures', 'iptc.jpg');
  var test = gm(iptcPath).options({imageMagick})

  test.identify(function (err) {
    if (err) return finish(err);

    var d = this.data;

    if (imageMagick) {
      var iptc = d['Profiles'] && d['Profiles']['Profile-iptc'];
      assert.equal(iptc['Caption[2,120]'], 'Some caption with colon space: for example');
    }

    finish();
  });

}
