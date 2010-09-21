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
        if (!err) console.dir(data)
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

    // annotate an image
    gm('/path/to/my/img.jpg')
      .stroke("#ffffff")
      .drawCircle(10, 10, 20, 10)
      .font("Helvetica.ttf", 12)
      .drawText(30, 20, "GMagick!")
      .write("/path/to/drawing.png", function(err){
        if (!err) print('done')
      })

    // creating an image
    gm(200, 400, "#ddff99f3")
      .drawText(10, 50, "from scratch")
      .write("/path/to/brandNewImg.jpg", function(err){
        // ...
      })
   

## Getting started
First download and install [GraphicsMagick](http://www.graphicsmagick.org/)

then either use npm:
    npm install gm

or clone the repo:
    git clone git://github.com/aheckmann/gm.git

## Examples:
     
  Check out the [examples](http://github.com/aheckmann/gm/tree/master/examples/) directory to play around. 
  Also take a look at the [Extending gm](http://wiki.github.com/aheckmann/gm/extending-gm)
  page to see how to customize gm to your own needs.

## Constructor:

  There are a few ways you can use the `gm` image constructor.

  - 1) `gm(path)` When you pass a string as the first argument it is interpreted as the path to an image you intend to manipulate.
  - 2) `gm(width, height)` When you pass two arguments it tells gm to create a new image on the fly with the provided dimensions. And you can still chain just like you do with pre-existing images too. See [here](http://github.com/aheckmann/gm/blob/master/examples/new.js) for an example.
  - 3) `gm(width, height, color)` The same as #2 but you may also specify a background color for the created image.

## Methods

  - getters
    - [size](http://aheckmann.github.com/gm/#getters) - returns the size (WxH) of the image
    - [format](http://aheckmann.github.com/gm/#getters) - returns the image format (gif, jpeg, png, etc)
    - [depth](http://aheckmann.github.com/gm/#getters) - returns the image color depth 
    - [color](http://aheckmann.github.com/gm/#getters) - returns the number of colors
    - [res](http://aheckmann.github.com/gm/#getters)   - returns the image resolution
    - [filesize](http://aheckmann.github.com/gm/#getters) - returns image filesize
    - [identify](http://aheckmann.github.com/gm/#getters) - returns all image data available

  - manipulation
    - [antialias](http://aheckmann.github.com/gm/#antialias)
    - [bitdepth](http://aheckmann.github.com/gm/#bitdepth)
    - [blur](http://aheckmann.github.com/gm/#blur)
    - [charcoal](http://aheckmann.github.com/gm/#charcoal)
    - [chop](http://aheckmann.github.com/gm/#chop)
    - [colors](http://aheckmann.github.com/gm/#colors)
    - [colorize](http://aheckmann.github.com/gm/#colorize)
    - [colorspace](http://aheckmann.github.com/gm/#colorspace)
    - [comment](http://aheckmann.github.com/gm/#comment)
    - [contrast](http://aheckmann.github.com/gm/#contrast)
    - [crop](http://aheckmann.github.com/gm/#crop)
    - [cycle](http://aheckmann.github.com/gm/#cycle)
    - [despeckle](http://aheckmann.github.com/gm/#despeckle)
    - [dither](http://aheckmann.github.com/gm/#dither)
    - [edge](http://aheckmann.github.com/gm/#edge)
    - [emboss](http://aheckmann.github.com/gm/#emboss)
    - [enhance](http://aheckmann.github.com/gm/#enhance)
    - [equalize](http://aheckmann.github.com/gm/#equalize)
    - [flip](http://aheckmann.github.com/gm/#flip)
    - [flop](http://aheckmann.github.com/gm/#flop)
    - [gamma](http://aheckmann.github.com/gm/#gamma)
    - [implode](http://aheckmann.github.com/gm/#implode)
    - [label](http://aheckmann.github.com/gm/#label)
    - [limit](http://aheckmann.github.com/gm/#limit)
    - [lower](http://aheckmann.github.com/gm/#lower)
    - [magnify](http://aheckmann.github.com/gm/#magnify)
    - [median](http://aheckmann.github.com/gm/#median)
    - [minify](http://aheckmann.github.com/gm/#minify)
    - [modulate](http://aheckmann.github.com/gm/#modulate)
    - [monochrome](http://aheckmann.github.com/gm/#monochrome)
    - [morph](http://aheckmann.github.com/gm/#morph)
    - [negative](http://aheckmann.github.com/gm/#negative)
    - [noise](http://aheckmann.github.com/gm/#noise)
    - [noProfile](http://aheckmann.github.com/gm/#profile)
    - [paint](http://aheckmann.github.com/gm/#paint)
    - [quality](http://aheckmann.github.com/gm/#quality)
    - [raise](http://aheckmann.github.com/gm/#raise)
    - [region](http://aheckmann.github.com/gm/#region)
    - [resample](http://aheckmann.github.com/gm/#resample)
    - [resize](http://aheckmann.github.com/gm/#resize) 
    - [roll](http://aheckmann.github.com/gm/#roll)
    - [rotate](http://aheckmann.github.com/gm/#rotate)
    - [scale](http://aheckmann.github.com/gm/#scale)
    - [sepia](http://aheckmann.github.com/gm/#sepia)
    - [sharpen](http://aheckmann.github.com/gm/#sharpen)
    - [solarize](http://aheckmann.github.com/gm/#solarize)
    - [spread](http://aheckmann.github.com/gm/#spread)
    - [swirl](http://aheckmann.github.com/gm/#swirl)
    - [thumb](http://aheckmann.github.com/gm/#thumb)
    - [type](http://aheckmann.github.com/gm/#type)
 
  - drawing primitives
    - [draw](http://aheckmann.github.com/gm/#draw)
    - [drawArc](http://aheckmann.github.com/gm/#drawArc)
    - [drawBezier](http://aheckmann.github.com/gm/#drawBezier)
    - [drawCircle](http://aheckmann.github.com/gm/#drawCircle)
    - [drawEllipse](http://aheckmann.github.com/gm/#drawEllipse)
    - [drawLine](http://aheckmann.github.com/gm/#drawLine)
    - [drawPoint](http://aheckmann.github.com/gm/#drawPoint)
    - [drawPolygon](http://aheckmann.github.com/gm/#drawPolygon)
    - [drawPolyline](http://aheckmann.github.com/gm/#drawPolyline)
    - [drawRectangle](http://aheckmann.github.com/gm/#drawRectangle)
    - [drawText](http://aheckmann.github.com/gm/#drawText)
    - [fill](http://aheckmann.github.com/gm/#fill)
    - [font](http://aheckmann.github.com/gm/#font)
    - [fontSize](http://aheckmann.github.com/gm/#fontSize)
    - [stroke](http://aheckmann.github.com/gm/#stroke)
    - [strokeWidth](http://aheckmann.github.com/gm/#strokeWidth)
    - [setDraw](http://aheckmann.github.com/gm/#setDraw)

      
## Node version
Compatible with v0.1.96+g
  
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
