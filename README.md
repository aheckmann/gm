# gm
GraphicsMagick for node

    var gm = require('./gm')

    // resize and remove EXIF profile data
    gm('/path/to/my/img.jpg')
      .resize(240, 240)
      .noProfile()
      .write('/path/to/resize.png', function(err){
        if (!err) print('done')
    })
  
    // obtain the size of an image
    gm('/path/to/my/img.jpg')
      .size(function(err, size){
        if (!err)
          print( size.width > size.height ? 'wider' : 'taller than you' )
      })

    // output all available image properties
    gm('/path/to/img.png')
      .identify(function(err, data){
        if (!err) sys.puts(sys.inspect(data))
      })

    // pull out the first frame of an animated gif and save as png
    gm('/path/to/animated.gif[0]')
      .write('/path/to/firstframe.png', function(err){
        if (err) print('aaw, shucks')
      })

    // crazytown
    gm('/path/to/my/img.jpg')
      .flip()
      .magnify()
      .rotate('green', 45)
      .blur(7, 3)
      .crop(300, 300, 150, 130)
      .edge(3)
      .write('/path/to/crazy.jpg', function(err){
        if (!err) print('crazytown has arrived')
      })
    

## Getting started
First download and install [GraphicsMagick](http://www.graphicsmagick.org/)

then either use npm:
    npm install gm

or clone the repo:
    git clone git://github.com/aheckmann/gm.git

## Examples:
     
  Check out the examples directory to play around. 
  Also take a look at the [Extending gm](http://wiki.github.com/aheckmann/gm/extending-gm)
  page to see how to customize gm to your own needs.


## Methods

  - getters
    - size - returns the size (WxH) of the image
    - format - returns the image format (gif, jpeg, png, etc)
    - depth - returns the image color depth 
    - color - returns the number of colors
    - res   - returns the image resolution
    - filesize - returns image filesize
    - identify - returns all image data available

  - manipulation
    - resize 
    - scale
    - resample
    - rotate
    - flip
    - flop
    - crop
    - chop
    - magnify
    - minify
    - quality
    - colorize
    - modulate
    - colors
    - blur
    - charcoal
    - thumb - create thumbnails based on minimum sizes
    - noProfile - removes EXIF, ICM, etc profile data
    - antialias
    - comment
    - contrast
    - cycle
    - depth
    - despeckle
    - dither
    - edge
    - emboss
    - enhance
    - equalize
    - gamma
    - implode
    - label
    - limit
    - median
    - monochrome
    - morph
    - negative
    - noise
 
  
## Node version
Compatible with v0.1.96+
  
## Inspiration
http://github.com/quiiver/magickal-node

## License 

(The MIT License)

Copyright (c) 2010 [Aaron Heckmann](aaron.heckmann+github@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
