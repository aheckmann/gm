
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  if (!GM.integration)
    return finish();

  gm(__dirname + '/fixtures/doge.jpg')
  .avatar(__dirname + '/fixtures/doge-avatar.png', function(err)
  {
    if(err)
    {
      finish(err);
    }
    else
    {
      gm.compare(__dirname + '/fixtures/doge-avatar.png', __dirname + '/fixtures/doge-avatar-compare.png',
      function (err, isEqual)
      {
        if (err) return handle(err);
        assert(isEqual);
        finish();
      })
    }
  });
}
