
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

module.exports = gm

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

[ 'size'
, 'format'
, 'depth'
, 'color'
, 'res'
, 'filesize'
].forEach(function(getter){
  gm.prototype[getter] = function(callback) {
    var self = this
    if (self.data[getter]) 
      return callback.call(self, null, self.data[getter]), self
    self.identify(function(err, stdout, stderr, cmd){
      if (err) return callback.call(self, err, stdout, stderr, cmd)
      callback.call(self, null, self.data[getter])
    })
    return self
  }
})

gm.prototype.identify = function(callback){
  var self = this
  if (!callback) return self
  if (self._identifying) return self._iq.push(callback), self
  if (Object.keys(self.data).length) 
    return callback.call(self, null, self.data), self
  self._iq = [callback]
  self._identifying = true
  var cmd = "gm identify -ping -verbose " + self.source
  self._exec(cmd, function(err, stdout, stderr){
    if (err) return callback.call(self, err, stdout, stderr, cmd)
    stdout = (stdout||"").trim().replace(/\r\n|\r/g, "\n")
    var parts = stdout.split("\n")
      , len = parts.length
      , rgx = /^( *)(.*)/
      , data = self.data
      , result
      , keyval
      , i = 0
      , handle = 
        { 'Geometry': function(val){
            var split = val.split("x")
            data.size = 
            { width:  parseInt(split[0], 10)
            , height: parseInt(split[1], 10) 
            } 
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
      self._iq[idx].call(self, null, self.data)
    self._identifying = false
  })
  return self
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

// http://www.graphicsmagick.org/GraphicsMagick.html#details-resample
gm.prototype.resample = function(w, h){
  return this.arg(null, ["-resample", w+"x"+h])
}

// http://www.graphicsmagick.org/GraphicsMagick.html#details-rotate
gm.prototype.rotate = function(color, deg){
  return this.arg(null, ["-background", color]).arg(null, ["-rotate", deg])
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

// http://www.graphicsmagick.org/GraphicsMagick.html#details-chop
gm.prototype.chop = function(w, h, x, y){
  return this.arg(["-chop", w+"x"+h + "+"+(x||0)+"+"+(y||0)])
}

// http://www.graphicsmagick.org/GraphicsMagick.html
gm.prototype.magnify = function(factor){
  return this.arg(["-magnify", factor])
}

// http://www.graphicsmagick.org/GraphicsMagick.html
gm.prototype.minify = function(factor){
  return this.arg(["-minify", factor])
}

// http://www.graphicsmagick.org/GraphicsMagick.html#details-quality
gm.prototype.quality = function(val){
  return this.arg(["-quality", val])
}

// http://www.graphicsmagick.org/GraphicsMagick.html#details-blur
gm.prototype.blur = function(radius, sigma){
  return this.arg(null, ["-blur", radius + (sigma ? "x"+sigma : "") ])
}

// http://www.graphicsmagick.org/convert.html
gm.prototype.charcoal = function(factor){
  return this.arg(["-charcoal", factor])
}

// http://www.graphicsmagick.org/GraphicsMagick.html#details-colorize
gm.prototype.colorize = function(r, g, b){
  return this.arg(null, ["-colorize", [r,g,b].join(",")])
}

// -- convenience methods

gm.prototype.thumb = function(w, h, name, callback){
  if (!callback)
    callback = name,
    name = null
  var self = this
  self.size(function(err, size){
    if (err) return callback.apply(self, arguments)
    w = parseInt(w, 10)
    h = parseInt(h, 10)
    var w1, h1
    if (size.width < size.height){
      w1 = w
      h1 = Math.floor(size.height * (w/size.width))
      if (h1 < h){
        w1 = Math.floor(w1 * ( ((h-h1)/h)+1 ))
        h1 = h
      }
    } 
    else if (size.width > size.height){
      h1 = h
      w1 = Math.floor(size.width * (h/size.height))
      if (w1 < w){
        h1 = Math.floor(h1 * ( ((w-w1)/w)+1 ))
        w1 = w
      }
    }
    else if (size.width == size.height){
      w1 = w
      h1 = h
    }
    self
      .quality(63)
      .arg(["-size", w1+"x"+h1])
      .scale(w1, h1)
      .crop(w, h)
      .noProfile()
      .write(name, function(){
        callback.apply(self, arguments)
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

gm.prototype.write = function(name, callback){
  if (!callback) 
    callback = name,
    name = null
  if ("function" != typeof callback)
    throw new TypeError("gm().write() expects a callback function")
  this.outname = name
  return this._exec(this.cmd(), callback)
}

gm.prototype._exec = function(cmd, callback) {
  var self = this
  exec(cmd, function(err, stdout, stderr){
    callback.call(self, err, stdout, stderr, cmd)
  })
  return self
}

gm.prototype.cmd = function(){
  return "gm convert " 
         + this._in.join(" ") + " " 
         + this.source + " " 
         + this._out.join(" ")+ " "
         + this.outname || this.source
}
