
var assert = require('assert');

module.exports = function (gm, dir, finish, GM) {
  'use strict';

  // a two magic numbers
  var NUMBER = 100;
  var NUMBER2 = 200;

  var g = gm.density(NUMBER, NUMBER2);

  var gArgs = g.args();

  assert.equal('convert', gArgs[0]);
  assert.equal('-density', gArgs[1]);
  assert.equal(NUMBER + 'x' + NUMBER2, gArgs[2]);

  if (gm._options.imageMagick)
    return finish();

  if (!GM.integration)
    return finish();

  g.write(dir + '/density.png', function density (err) {
    finish(err);
  });
};
