
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)


var exec = require('child_process').exec
  , gm = {}
  

gm.Image = function(utility, input) {
  this.input = input
  this.inArgs = [utility]
  this.outArgs = []
}

gm.Image.prototype = 
{ size: function(width, height){
    return this.makeArgs(["-size", width + "x" + height])
  }
, _noProfileArg: function(){
    return ['+profile "*"']
  }
, _resizeArg: function(width, height) {
    return ["-resize", width + "x" + height]
  }
, makeArgs: function(inargs, outargs) {
    if (inargs) 
      this.inArgs = this.inArgs.concat(inargs)   
    if (outargs)
      this.outArgs = this.outArgs.concat(outargs)
    return this
  }
, cmd: function() {
    return "gm " 
            + this.inArgs.join(" ") + " " 
            + this.input + " " 
            + this.outArgs.join(" ")
  }
, write: function(callback){
    var cmd = this.cmd()
    exec(cmd, function(err, stdout, stderr){
      callback(err, stdout, stderr, cmd);
    })
  }
}


gm.Mogrify = function(image) {
  gm.Image.call(this, 'mogrify', image)
}
function mog() {}
mog.prototype = gm.Image.prototype
;(gm.Mogrify.prototype = new mog).constructor = gm.Mogrify

gm.Mogrify.prototype.format = function(format){
  return this.makeArgs(["-format", format])
}
gm.Mogrify.prototype.dir = function(dir) {
  return this.makeArgs(["-output-directory", dir])
}
gm.Mogrify.prototype.createDir = function(dir) {
  return this.makeArgs(["-create-directories"])
}
gm.Mogrify.prototype.resize = function(width, height){
  return this.makeArgs(this._resizeArg(width, height))
}
gm.Mogrify.prototype.noProfile = function() {
  return this.makeArgs(this._noProfileArg())
}


gm.Convert = function(image) {
  gm.Image.call(this, 'convert', image)
}
function con(){}
con.prototype = gm.Image.prototype
;(gm.Convert.prototype = new con).constructor = gm.Convert

gm.Convert.prototype.resize = function(width, height){
  return this.makeArgs(null, this._resizeArg(width, height))
}
gm.Convert.prototype.noProfile = function() {
  return this.makeArgs(null, this._noProfileArg())
}
gm.Convert.prototype.name = function(filename) {
  return this.makeArgs(null, [filename])
}


exports.Image = gm.Image

exports.mogrify = function(image) {
  return new gm.Mogrify(image)
}
exports.convert = function(image) {
  return new gm.Convert(image)
}