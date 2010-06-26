
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = gm

var sys = require('sys')
  , p = function(what){ sys.puts(sys.inspect(what)) }
var exec = require('child_process').exec

function gm(source){
  if (!(this instanceof gm))
    return new gm(source)
  this.source = source
  this.data = {}
  this._in = []
  this._out = []
}
  

// -- getters

['size', 'format', 'depth', 'color', 'res', 'filesize'].forEach(function(getter){
  gm.prototype[getter] = function(callback) {
    if (this.data[getter]) return callback(null, this.data[getter]), this
    var self = this
    self.identify(function(err, stdout, stderr, cmd){
      if (err) return callback(err, stdout, stderr, cmd)
      callback(null, self.data[getter])
    })
  }
})

gm.prototype.identify = function(callback){
  if (!callback) return this
  if (this._identifying) return this._iq.push(callback), this
  if (Object.keys(this.data).length) return callback(null, this.data), this
  var self = this
  self._iq = [callback]
  self._identifying = true
  var cmd = "gm identify -ping -verbose "+ this.source
  this._exec(cmd, function(err, stdout, stderr){
    if (err) return callback(err, stdout, stderr, cmd)
    stdout = (stdout||"").trim().replace(/\r\n|\r/g, "\n")
    var parts = stdout.split("\n")
      , len = parts.length
      , i = 0
      , data = self.data
      , rgx = /^( *)(.*)/
      , result
      , keyval
      , handle = 
        { 'Geometry': function(val){
            var split = val.split("x")
            data.size = { width: split[0], height: split[1] } 
          }
        , 'Format': function(val){
            data.format = val.split(" ")[0]
          }
        , 'Depth': function(val){
            data.depth = parseInt(val, 10)
          }
        , 'Colors': function(val){
            data.color = parseInt(val, 10)
          }
        , 'Resolution': function(val){
            data.res = val
          }
        , 'Filesize': function(val){
            data.filesize = val
          }
        } 
    for(; i < len; ++i) {
      if (result = rgx.exec(parts[i])){
        if (2 == result[1].length){
          var keyval = result[2].split(":") 
          if (keyval.length > 1)
            if (handle[keyval[0]])
              handle[keyval[0]](keyval[1].trim())
            else
              data[keyval[0]] = keyval[1].trim()
        }
      }
    }
    var idx = self._iq.length
    while(idx--)
      self._iq[idx](null, self.data)
    self._identifying = false
  })
  return this
}


// -- args

// http://www.graphicsmagick.org/GraphicsMagick.html#details-resize
gm.prototype.resize = function(w, h){
  return this.arg(["-size", w +"x"+ h], ["-resize ", w +"x"+ h])
}

// http://www.graphicsmagick.org/GraphicsMagick.html#details-scale
gm.prototype.scale = function(w, h){
  return this.arg(null, ["-scale", w +"x"+ h])
}

// http://www.graphicsmagick.org/GraphicsMagick.html#details-profile
gm.prototype.noProfile = function(){
  return this.arg(null, ['+profile "*"'])
}

// output file name
gm.prototype.name = function(name){
  return this.outname = name, this
}

// http://www.graphicsmagick.org/GraphicsMagick.html#details-resample
gm.prototype.resample = function(w, h){
  return this.arg(null, ["-resample", w+"x"+h])
}

// http://www.graphicsmagick.org/GraphicsMagick.html#details-rotate
gm.prototype.rotate = function(color, deg){
  return this.arg(null, ["-rotate", deg]).arg(null, ["-background", color])
}

// http://www.graphicsmagick.org/GraphicsMagick.html#details-flip
gm.prototype.flip = function(){
  return this.arg(null, ["-flip"])
}

// http://www.graphicsmagick.org/GraphicsMagick.html#details-flop 
gm.prototype.flop = function(){
  return this.arg(null, ["-flop"])
}

// http://www.graphicsmagick.org/GraphicsMagick.html#details-crop
gm.prototype.crop = function(w, h, x, y){
  return this.arg(null, ["-crop", w+"x"+h + "+"+(x||0)+"+"+(y||0)])
}

// http://www.graphicsmagick.org/GraphicsMagick.html
gm.prototype.magnify = function(factor){
  return this.arg(null, ["-magnify", factor])
}

// http://www.graphicsmagick.org/GraphicsMagick.html
gm.prototype.minify = function(factor){
  return this.arg(null, ["-minify", factor])
}


// -- convenience methods

gm.prototype.thumb = function(w, h, name, callback){
  if (!callback)
    callback = name,
    name = null
  var self = this
  self.size(function(err, size){
    if (err) return callback.apply(null, arguments)
    w = parseInt(w, 10)
    h = parseInt(h, 10)
    var w1, h1
    if (size.width < size.height)
      w1 = w,
      h1 = Math.floor(size.height * (w/size.width))
    else if (size.width > size.height)
      w1 = Math.floor(size.width * (h/size.height)),
      h1 = h
    else if (size.width == size.height)
      w1 = w,
      h1 = h
    // ensure minimum sizes are met
    if (w1 < w)
      h1 = Math.floor(h1 * ( ((w-w1)/w)+1 )),
      w1 = w
    else if (h1 < h)
      w1 = Math.floor(w1 * ( ((h-h1)/h)+1 )),
      h1 = h
    self.arg(["-size", w1+"x"+h1]).scale(w1, h1).crop(w, h).name(name).noProfile().write(function(){
      callback.apply(null, arguments)
    })
  })
  return self
}


// -- commandline

gm.prototype.arg = function(inargs, outargs){
  if (inargs) 
    this._in = this._in.concat(inargs)   
  if (outargs)
    this._out = this._out.concat(outargs)
  return this
}

gm.prototype.cmd = function(){
  return "gm convert " 
         + this._in.join(" ") + " " 
         + this.source + " " 
         + this._out.join(" ")+ " "
         + this.outname || this.source
}



//////





/*
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
*/
