
var assert = require('assert')

module.exports = function (_, dir, finish, gm) {
  if (!gm.integration)
    return finish();

  var im = _._options.imageMagick;

  var test = gm(__dirname + '/fixtures/iptc-multiple.jpg');
  if (im) test.options({ imageMagick: true });

  test.identify(function (err) {
    if (err) return finish(err);

    var d = this.data;

    if (im) {
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
