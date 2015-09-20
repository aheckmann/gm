var gm = require('../')
  , dir = __dirname + '/imgs'

gm(dir + '/original.png')
  .colorize(80, 0, 30)
  .on("pid-announce", function(data){console.log("Child Process spawned with pid:", data.pid)})
  .write(dir + '/colorize.jpg', function(err){
    if (err) return console.dir(arguments)
    console.log(this.outname + ' created  :: ' + arguments[3])
  }
)