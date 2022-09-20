const assert = require('assert');
const path = require('path');

module.exports = function (_, dir, finish, gm, imageMagick) {
  if (!gm.integration)
    return finish();

  const iptcPath = path.join(__dirname, 'fixtures', 'iptc-multiple.jpg');
  var test = gm(iptcPath).options({imageMagick})

  test.identify(function (err) {
    if (err) return finish(err);

    var d = this.data;

    if (imageMagick) {
      var iptc = d['Profiles'] && d['Profiles']['Profile-iptc'];
      var keywords = iptc['Keyword[2,25]'];
      assert(Array.isArray(keywords));
      assert.equal(keywords.length, 5);

      // just make sure another value
      assert(! Array.isArray(iptc['Headline[2,105]']));
    }

    finish();
  });

}
