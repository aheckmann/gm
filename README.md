# gm
GraphicsMagick for node

## getting started
First download and install "GraphicsMagick":http://www.graphicsmagick.org/

## example:
     
    gm.convert(image.tempfile)
      .size(120,120)
      .resize(120,120)
      .noProfile()
      .name('/path/to/thumbnails/'+image.filename)
      .write(function(err){
        if (!err) print('done!')
      }
    
or

    gm.mogrify(image.tempfile)
      .resize(250,400)
      .format("png")
      .size(250,400)
      .dir('/path/to/out')
      .noProfile()
      .write(function(err){
        if (!err) print('success!')
      })

## methods
gm includes light support for the GraphicsMagick `convert` and `mogrify` commands.

  - convert
    - name
    - size
    - resize
    - noProfile
    - write
    - makeArgs
    - cmd
    
  - mogrify
    - format
    - dir
    - createDir
    - size
    - resize
    - noProfile
    - write
    - makeArgs
    - cmd
  
  More docs coming soon.
  
## node version
Compatible with v0.1.96+
  
## insperation
Inspired by "magickal-node":http://github.com/quiiver/magickal-node
   
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