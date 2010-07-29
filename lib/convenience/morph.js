
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

var fs = require('fs')

module.exports = function(proto){
  
// http://www.graphicsmagick.org/GraphicsMagick.html#details-morph
proto.morph = function (other, outname, callback){
  if (!callback) callback = function(){}
  if (!outname) throw new Error("an output filename is required")
  var self = this
  self.arg(null, [other, "-morph", 1])
  self.write(outname, function(err, stdout, stderr, cmd){
    if (err) return callback.call(self, err, stdout, stderr, cmd)
    var remaining = 3
    fs.unlink(outname + ".0", next)
    fs.unlink(outname + ".2", next)
    fs.rename(outname + ".1", outname, next)
    function next(err){
      if (err) {
        remaining = 0
        return callback.call(self, err, stdout, stderr, cmd)
      }
      if (!--remaining)
        return callback.call(self, err, stdout, stderr, cmd)
    }
  })
  return self
}}
