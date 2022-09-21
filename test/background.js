const assert =require('assert')
const path = require('path');

module.exports = function (gm, dir, finish, GM) {

  var m = gm
  .crop(140,100)
  .background("#FF0000")
  .extent(340,300)

  var args = m.args();
  assert.equal('convert', args[0]);
  assert.equal('-background', args[1]);
  assert.equal('#FF0000', args[2]);
  assert.equal('-crop', args[4]);
  assert.equal('140x100+0+0', args[5]);
  assert.equal('-extent', args[6]);
  assert.equal('340x300', args[7]);

  if (!GM.integration)
    return finish();

  const backgroundPathName = path.join(dir, 'background.jpg');

  m.write(backgroundPathName, function (err) {
    finish(err);
  });
}
