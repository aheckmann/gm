
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)


var assert = require('assert')

module.exports = function (_, dir, finish, gm) {

  var sub = gm.subClass({ subclassed: true });
  var s = sub('test').options({ setWithMethod: 2 });
  var g = gm('test').options({ hellowwww: 'there' });

  assert.equal(2, s._options.setWithMethod);
  assert.equal(true, s._options.subclassed);
  assert.equal('there', g._options.hellowwww);
  assert.equal(undefined, g._options.setWithMethod);
  assert.equal(undefined, s._options.hellowwww);
  assert.equal(undefined, g._options.subclassed);

  var s2 = sub('another');
  assert.equal(true, s2._options.subclassed);
  assert.equal(undefined, s2._options.setWithMethod);

  finish();
}
