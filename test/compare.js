var assert = require('assert');
var fs = require('fs');

module.exports = function (gm, dir, finish, GM) {
  GM.compare(dir + '/original.jpg', dir + '/original.png', function(err, same) {
    if (err || !same) finish(err);
    else outputDiff();
  });

  function outputDiff() {
    var options = {
      highlightColor: 'yellow',
      file: dir + '/diff.png'
    };
    GM.compare(dir + '/original.jpg', dir + '/originalCompare.jpg', options, function(err) {
      if (err) return finish(err);
      fs.exists(options.file, function(exists) {
        finish(!exists);
      });
    });
  }
};
