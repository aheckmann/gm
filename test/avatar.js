
var assert = require('assert')

module.exports = function (gm, dir, finish, GM) {

  if (!GM.integration)
    return finish();

  gm
  .avatar(__dirname + '/fixtures/avatar.png', function(err)
  {
    if(err)
    {
      finish(err);
    }
    else
    {
      gm.compare(__dirname + '/fixtures/avatar.png', __dirname + '/fixtures/avatar-compare.png',
      function (err, isEqual)
      {
        if (err) return handle(err);
        assert(isEqual);
        finish();
      })
    }
  });
}
