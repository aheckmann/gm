
var assert = require('assert')

module.exports = function (_, dir, finish, gm) {

  assert.equal('function', typeof gm.utils.buffer);
  assert.equal('function', typeof gm.utils.escape);
  finish();

}
