
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

// -- commandline

var exec = require('child_process').exec

module.exports = function(proto){

  proto.arg = function(inargs, outargs){
    if (inargs) 
      this._in = this._in.concat(inargs)   
    if (outargs)
      this._out = this._out.concat(outargs)
    return this
  }

  proto.write = function(name, callback){
    if (!callback) callback = name, name = null
    if ("function" != typeof callback)
      throw new TypeError("gm().write() expects a callback function")
    if (!name)
      throw new TypeError("gm().write() expects a filename when writing new files")
    this.outname = name
    return this._exec(this.cmd(), callback)
  }

  proto._exec = function(cmd, callback) {
    var self = this
    exec(cmd, function(err, stdout, stderr){
      callback.call(self, err, stdout, stderr, cmd)
    })
    return self
  }

  proto.cmd = function(){
    return "gm convert " 
           + this._in.join(" ") + " " 
           + this.source + " " 
           + this._out.join(" ")+ " "
           + this.outname || this.source
  }
}
