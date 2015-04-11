var assert = require('assert');
var async = require('async');

module.exports = function (_, dir, finish, gm, im) {
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
  // alpha not supported by GM so only test IM
  if (!im) {
    assert.throws(function() {
        gm(dir + '/edge.png')
          .alpha( alphaTypes.pop() ).write(dir+'/alpha_fail.png');
 
    });
    finish();
  } else {

  async.eachSeries(alphaTypes,function(alphaType,cb) {
    var m = gm(dir + '/edge.png').options({imageMagick: im}).alpha( alphaType );
    var args = m.args();
    assert.equal('convert', args[0]);
    assert.equal('-alpha', args[2]);
    assert.equal(alphaType, args[3]);

    m.write( dir + '/alpha_' + alphaType + '.png', cb);

  },finish);
}
}
