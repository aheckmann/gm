# gm
GraphicsMagick for node


## Basic Usage
```` js
var fs = require('fs')
  , gm = require('./gm');

// resize and remove EXIF profile data
gm('/path/to/my/img.jpg')
.resize(240, 240)
.noProfile()
.write('/path/to/resize.png', function (err) {
  if (!err) console.log('done');
});

// obtain the size of an image
gm('/path/to/my/img.jpg')
.size(function (err, size) {
  if (!err)
    console.log(size.width > size.height ? 'wider' : 'taller than you');
});

// output all available image properties
gm('/path/to/img.png')
.identify(function (err, data) {
  if (!err) console.log(data)
});

// pull out the first frame of an animated gif and save as png
gm('/path/to/animated.gif[0]')
.write('/path/to/firstframe.png', function (err) {
  if (err) console.log('aaw, shucks');
});

// auto-orient an image
gm('/path/to/img.jpg')
.autoOrient()
.write('/path/to/oriented.jpg', function (err) {
  if (err) ...
})

// crazytown
gm('/path/to/my/img.jpg')
.flip()
.magnify()
.rotate('green', 45)
.blur(7, 3)
.crop(300, 300, 150, 130)
.edge(3)
.write('/path/to/crazy.jpg', function (err) {
  if (!err) console.log('crazytown has arrived');
})

// annotate an image
gm('/path/to/my/img.jpg')
.stroke("#ffffff")
.drawCircle(10, 10, 20, 10)
.font("Helvetica.ttf", 12)
.drawText(30, 20, "GMagick!")
.write("/path/to/drawing.png", function (err) {
  if (!err) console.log('done');
});

// creating an image
gm(200, 400, "#ddff99f3")
.drawText(10, 50, "from scratch")
.write("/path/to/brandNewImg.jpg", function (err) {
  // ...
});
````

## Image paths or Streams
```` js
// can provide either a file path or a ReadableStream
// (from a local file or incoming network request)
var readStream = fs.createReadStream('/path/to/my/img.jpg');
gm(readStream, 'img.jpg')
.write('/path/to/reformat.png', function (err) {
  if (!err) console.log('done');
});

// can also stream output to a ReadableStream
// (can be piped to a local file or remote server)
gm('/path/to/my/img.jpg')
.resize('200', '200')
.stream(function (err, stdout, stderr) {
  var writeStream = fs.createWriteStream('/path/to/my/resized.jpg');
  stdout.pipe(writeStream);
});

// pass a format or filename to stream() and
// gm will provide image data in that format
gm('/path/to/my/img.jpg')
.stream('png', function (err, stdout, stderr) {
  var writeStream = fs.createWriteStream('/path/to/my/reformated.png');
  stdout.pipe(writeStream);
});

// combine the two for true streaming image processing
var readStream = fs.createReadStream('/path/to/my/img.jpg');
gm(readStream, 'img.jpg')
.resize('200', '200')
.stream(function (err, stdout, stderr) {
  var writeStream = fs.createWriteStream('/path/to/my/resized.jpg');
  stdout.pipe(writeStream);
});

// when working with input streams and any 'identify'
// operation (size, format, etc), you must pass "{bufferStream: true}" if
// you also need to convert (write() or stream()) the image afterwards
// NOTE: this temporarily buffers the image stream in Node memory
var readStream = fs.createReadStream('/path/to/my/img.jpg');
gm(readStream, 'img.jpg')
.size({bufferStream: true}, function(err, size) {
  this.resize(size.width / 2, size.height / 2)
  this.write('/path/to/resized.jpg', function (err) {
    if (!err) console.log('done');
  });
});

````

## Getting started
First download and install [GraphicsMagick](http://www.graphicsmagick.org/)

then either use npm:

    npm install gm

or clone the repo:

    git clone git://github.com/aheckmann/gm.git

## Examples:

  Check out the [examples](http://github.com/aheckmann/gm/tree/master/examples/) directory to play around. 
  Also take a look at the [extending gm](http://wiki.github.com/aheckmann/gm/extending-gm)
  page to see how to customize gm to your own needs.

## Constructor:

  There are a few ways you can use the `gm` image constructor.

  - 1) `gm(path)` When you pass a string as the first argument it is interpreted as the path to an image you intend to manipulate.
  - 2) `gm(stream, [filename])` You may also pass a ReadableStream as the first argument, with an optional file name for format inference.
  - 3) `gm(width, height, [color])` When you pass two integer arguments, gm will create a new image on the fly with the provided dimensions and an optional background color. And you can still chain just like you do with pre-existing images too. See [here](http://github.com/aheckmann/gm/blob/master/examples/new.js) for an example.

## Methods

  - getters
    - [size](http://aheckmann.github.com/gm/docs.html#getters) - returns the size (WxH) of the image
    - [orientation](http://aheckmann.github.com/gm/docs.html#orientation) - returns the EXIF orientation of the image
    - [format](http://aheckmann.github.com/gm/docs.html#getters) - returns the image format (gif, jpeg, png, etc)
    - [depth](http://aheckmann.github.com/gm/docs.html#getters) - returns the image color depth 
    - [color](http://aheckmann.github.com/gm/docs.html#getters) - returns the number of colors
    - [res](http://aheckmann.github.com/gm/docs.html#getters)   - returns the image resolution
    - [filesize](http://aheckmann.github.com/gm/docs.html#getters) - returns image filesize
    - [identify](http://aheckmann.github.com/gm/docs.html#getters) - returns all image data available

  - manipulation
    - [antialias](http://aheckmann.github.com/gm/docs.html#antialias)
    - [autoOrient](http://aheckmann.github.com/gm/docs.html#autoOrient)
    - [bitdepth](http://aheckmann.github.com/gm/docs.html#bitdepth)
    - [blur](http://aheckmann.github.com/gm/docs.html#blur)
    - [charcoal](http://aheckmann.github.com/gm/docs.html#charcoal)
    - [chop](http://aheckmann.github.com/gm/docs.html#chop)
    - [colors](http://aheckmann.github.com/gm/docs.html#colors)
    - [colorize](http://aheckmann.github.com/gm/docs.html#colorize)
    - [colorspace](http://aheckmann.github.com/gm/docs.html#colorspace)
    - [comment](http://aheckmann.github.com/gm/docs.html#comment)
    - [contrast](http://aheckmann.github.com/gm/docs.html#contrast)
    - [crop](http://aheckmann.github.com/gm/docs.html#crop)
    - [cycle](http://aheckmann.github.com/gm/docs.html#cycle)
    - [density](http://aheckmann.github.com/gm/docs.html#density)
    - [despeckle](http://aheckmann.github.com/gm/docs.html#despeckle)
    - [dither](http://aheckmann.github.com/gm/docs.html#dither)
    - [edge](http://aheckmann.github.com/gm/docs.html#edge)
    - [emboss](http://aheckmann.github.com/gm/docs.html#emboss)
    - [enhance](http://aheckmann.github.com/gm/docs.html#enhance)
    - [equalize](http://aheckmann.github.com/gm/docs.html#equalize)
    - [extent](http://aheckmann.github.com/gm/docs.html#extent)
    - [filter](http://aheckmann.github.com/gm/docs.html#filter)
    - [flip](http://aheckmann.github.com/gm/docs.html#flip)
    - [flop](http://aheckmann.github.com/gm/docs.html#flop)
    - [gamma](http://aheckmann.github.com/gm/docs.html#gamma)
    - [gravity](http://aheckmann.github.com/gm/docs.html#gravity)
    - [implode](http://aheckmann.github.com/gm/docs.html#implode)
    - [interlace](http://aheckmann.github.com/gm/docs.html#interlace)
    - [label](http://aheckmann.github.com/gm/docs.html#label)
    - [limit](http://aheckmann.github.com/gm/docs.html#limit)
    - [lower](http://aheckmann.github.com/gm/docs.html#lower)
    - [magnify](http://aheckmann.github.com/gm/docs.html#magnify)
    - [median](http://aheckmann.github.com/gm/docs.html#median)
    - [minify](http://aheckmann.github.com/gm/docs.html#minify)
    - [modulate](http://aheckmann.github.com/gm/docs.html#modulate)
    - [monochrome](http://aheckmann.github.com/gm/docs.html#monochrome)
    - [morph](http://aheckmann.github.com/gm/docs.html#morph)
    - [negative](http://aheckmann.github.com/gm/docs.html#negative)
    - [noise](http://aheckmann.github.com/gm/docs.html#noise)
    - [noProfile](http://aheckmann.github.com/gm/docs.html#profile)
    - [paint](http://aheckmann.github.com/gm/docs.html#paint)
    - [quality](http://aheckmann.github.com/gm/docs.html#quality)
    - [raise](http://aheckmann.github.com/gm/docs.html#raise)
    - [region](http://aheckmann.github.com/gm/docs.html#region)
    - [resample](http://aheckmann.github.com/gm/docs.html#resample)
    - [resize](http://aheckmann.github.com/gm/docs.html#resize)
    - [roll](http://aheckmann.github.com/gm/docs.html#roll)
    - [rotate](http://aheckmann.github.com/gm/docs.html#rotate)
    - [scale](http://aheckmann.github.com/gm/docs.html#scale)
    - [sepia](http://aheckmann.github.com/gm/docs.html#sepia)
    - [setFormat](http://aheckmann.github.com/gm/docs.html#setformat)
    - [sharpen](http://aheckmann.github.com/gm/docs.html#sharpen)
    - [solarize](http://aheckmann.github.com/gm/docs.html#solarize)
    - [strip](http://aheckmann.github.com/gm/docs.html#strip) _imagemagick only_
    - [spread](http://aheckmann.github.com/gm/docs.html#spread)
    - [swirl](http://aheckmann.github.com/gm/docs.html#swirl)
    - [thumb](http://aheckmann.github.com/gm/docs.html#thumb)
    - [trim](http://aheckmann.github.com/gm/docs.html#trim)
    - [type](http://aheckmann.github.com/gm/docs.html#type)

  - drawing primitives
    - [draw](http://aheckmann.github.com/gm/docs.html#draw)
    - [drawArc](http://aheckmann.github.com/gm/docs.html#drawArc)
    - [drawBezier](http://aheckmann.github.com/gm/docs.html#drawBezier)
    - [drawCircle](http://aheckmann.github.com/gm/docs.html#drawCircle)
    - [drawEllipse](http://aheckmann.github.com/gm/docs.html#drawEllipse)
    - [drawLine](http://aheckmann.github.com/gm/docs.html#drawLine)
    - [drawPoint](http://aheckmann.github.com/gm/docs.html#drawPoint)
    - [drawPolygon](http://aheckmann.github.com/gm/docs.html#drawPolygon)
    - [drawPolyline](http://aheckmann.github.com/gm/docs.html#drawPolyline)
    - [drawRectangle](http://aheckmann.github.com/gm/docs.html#drawRectangle)
    - [drawText](http://aheckmann.github.com/gm/docs.html#drawText)
    - [fill](http://aheckmann.github.com/gm/docs.html#fill)
    - [font](http://aheckmann.github.com/gm/docs.html#font)
    - [fontSize](http://aheckmann.github.com/gm/docs.html#fontSize)
    - [stroke](http://aheckmann.github.com/gm/docs.html#stroke)
    - [strokeWidth](http://aheckmann.github.com/gm/docs.html#strokeWidth)
    - [setDraw](http://aheckmann.github.com/gm/docs.html#setDraw)

  - image output
    - **write** - writes the processed image data to the specified filename
    - **stream** - provides a ReadableStream with the processed image data

## Contributors
[https://github.com/aheckmann/gm/contributors](https://github.com/aheckmann/gm/contributors)

## Inspiration
http://github.com/quiiver/magickal-node

## License

(The MIT License)

Copyright (c) 2011 [Aaron Heckmann](aaron.heckmann+github@gmail.com)

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
