
var assert = require('assert');

module.exports = function (gm, dir, finish, GM) {
  'use strict';

  // a magic number
  var NUMBER = 100;

  // image magic version
  var im = gm.options({imageMagick: true}).density(NUMBER);

  var imArgs = im.args();

  assert.equal('convert', imArgs[0]);
  assert.equal('-density', imArgs[1]);
  assert.equal(NUMBER, imArgs[2]);

  if (gm._options.imageMagick)
    return finish();

  if (!GM.integration)
    return finish();

  im.write(dir + '/density.png', function density (err) {
    finish(err);
  });
};
