# gm
GraphicsMagick for node

    var gm = require('./lib/gm')

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

    // crazytown
    gm('/path/to/my/img.jpg')
      .flip()
      .magnify()
      .rotate('green', 45)
      .blur(7, 3)
      .crop(300, 300, 150, 130)
      .write('/path/to/crazy.jpg', function(err){
        if (!err) print('crazytown has arrived')
      })
    

## getting started
First download and install "GraphicsMagick":http://www.graphicsmagick.org/

## examples:
     
  check out the examples directory to play around

## methods

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
    - magnify
    - minify
    - quality
    - thumb - create thumbnails based on minimum sizes
    - blur
    - noProfile - removes EXIF, ICM, etc profile data
 
  
## node version
Compatible with v0.1.96+
  
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
