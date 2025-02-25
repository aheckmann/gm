const assert = require('assert');
const Async = require('async');
const path = require('path');

module.exports = function (_, dir, finish, gm, imageMagick) {
  if (!gm.integration) return finish();

  var alphaTypes = [
    "Activate",
    "On",
    "Deactivate",
    "Off",
    "Set",
    "Opaque",
    "Transparent",
    "Extract",
    "Copy",
    "Shape",
    "Background"
  ];

  const edgePath = path.join(dir, 'original.png');
  const failPath = path.join(dir, 'alpha_fail.png');

  // alpha not supported by GM so only test IM
  if (!imageMagick) {
    assert.throws(function() {
      gm(edgePath)
        .alpha(alphaTypes.pop())
        .write(failPath);
    });
    finish();
  } else {

    Async.eachSeries(alphaTypes, function(alphaType, cb) {
      var m = gm(edgePath).options({imageMagick}).alpha( alphaType );
      var args = m.args();
      assert.equal('convert', args[0]);
      assert.equal('-alpha', args[2]);
      assert.equal(alphaType, args[3]);

      const writePath = path.join(dir, `alpha_${alphaType}.png`);
      m.write(writePath, cb);
    }, finish);
  }
}
