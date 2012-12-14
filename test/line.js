
var assert =require('assert')

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .blur(8, 4)
  .stroke("red", 3)
  .drawLine(20, 10, 50, 40);

  var args = m.args();
  assert.equal('-blur', args[2]);
  assert.equal('8x4', args[3]);
  assert.equal('-strokewidth', args[4]);
  assert.equal(3, args[5]);
  assert.equal('-stroke', args[6]);
  assert.equal('red', args[7]);
  assert.equal('-draw', args[8]);
  assert.equal('line 20,10 50,40', args[9]);

  if (!GM.integration)
    return finish();

  m
  .write(dir + '/line.png', function line (err) {
    finish(err);
  });
}
