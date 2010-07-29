
// gm - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

// -- getters

module.exports = function(proto){

; [ 'size'
  , 'format'
  , 'depth'
  , 'color'
  , 'res'
  , 'filesize'
  ].forEach(function(getter){
    proto[getter] = function(callback) {
      var self = this
      if (self.data[getter]) 
        return callback.call(self, null, self.data[getter]), self
      self.identify(function(err, stdout, stderr, cmd){
        if (err) return callback.call(self, err, stdout, stderr, cmd)
        callback.call(self, null, self.data[getter])
      })
      return self
    }
  }
)

proto.identify = function(callback){
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
    for (; i < len; ++i){
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

}}
