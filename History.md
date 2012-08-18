
1.4.2 / 2012-08-17
==================

  * fixed; identify parsing for ImageMagick exif data (#58)
  * fixed; when in imageMagick mode, complain about missing imageMagick [bcherry](https://github.com/bcherry) (#73)
  * added; tests

1.4.1 / 2012-07-31
==================

  * fixed; scenes() args
  * fixed; accept the left-to-right arg of append()
  * added; _subCommand

## v1.4 - 07/28/2012

  * added; adjoin() [Math-]
  * added; affine() [Math-]
  * added; append() [Math-]
  * added; authenticate() [Math-]
  * added; average() [Math-]
  * added; backdrop() [Math-]
  * added; blackThreshold() [Math-]
  * added; bluePrimary() [Math-]
  * added; border() [Math-]
  * added; borderColor() [Math-]
  * added; box() [Math-]
  * added; channel() [Math-]
  * added; clip() [Math-]
  * added; coalesce() [Math-]
  * added; colorMap() [Math-]
  * added; compose() [Math-]
  * added; compress() [Math-]
  * added; convolve() [Math-]
  * added; createDirectories() [Math-]
  * added; deconstruct() [Math-]
  * added; delay() [Math-]
  * added; define() [Math-]
  * added; displace() [Math-]
  * added; display() [Math-]
  * added; dispose() [Math-]
  * added; disolve() [Math-]
  * added; encoding() [Math-]
  * added; endian() [Math-]
  * added; file() [Math-]
  * added; flatten() [Math-]
  * added; foreground() [Math-]
  * added; frame() [Math-]
  * added; fuzz() [Math-]
  * added; gaussian() [Math-]
  * added; geometry() [Math-]
  * added; greenPrimary() [Math-]
  * added; highlightColor() [Math-]
  * added; highlightStyle() [Math-]
  * added; iconGeometry() [Math-]
  * added; intent() [Math-]
  * added; lat() [Math-]
  * added; level() [Math-]
  * added; list() [Math-]
  * added; log() [Math-]
  * added; map() [Math-]
  * added; matte() [Math-]
  * added; matteColor() [Math-]
  * added; mask() [Math-]
  * added; maximumError() [Math-]
  * added; mode() [Math-]
  * added; monitor() [Math-]
  * added; mosaic() [Math-]
  * added; motionBlur() [Math-]
  * added; name() [Math-]
  * added; noop() [Math-]
  * added; normalize() [Math-]
  * added; opaque() [Math-]
  * added; operator() [Math-]
  * added; orderedDither() [Math-]
  * added; outputDirectory() [Math-]
  * added; page() [Math-]
  * added; pause() [Math-]
  * added; pen() [Math-]
  * added; ping() [Math-]
  * added; pointSize() [Math-]
  * added; preview() [Math-]
  * added; process() [Math-]
  * added; profile() [Math-]
  * added; progress() [Math-]
  * added; rawSize() [Math-]
  * added; randomThreshold() [Math-]
  * added; recolor() [Math-]
  * added; redPrimary() [Math-]
  * added; remote() [Math-]
  * added; render() [Math-]
  * added; repage() [Math-]
  * added; sample() [Math-]
  * added; samplingFactor() [Math-]
  * added; scene() [Math-]
  * added; scenes() [Math-]
  * added; screen() [Math-]
  * added; segment() [Math-]
  * added; set() [Math-]
  * added; shade() [Math-]
  * added; shadow() [Math-]
  * added; sharedMemory() [Math-]
  * added; shave() [Math-]
  * added; shear() [Math-]
  * added; silent() [Math-]
  * added; snaps() [Math-]
  * added; stagano() [Math-]
  * added; stereo() [Math-]
  * added; textFont() [Math-]
  * added; texture() [Math-]
  * added; threshold() [Math-]
  * added; tile() [Math-]
  * added; transform() [Math-]
  * added; transparent() [Math-]
  * added; treeDepth() [Math-]
  * added; update() [Math-]
  * added; units() [Math-]
  * added; unsharp() [Math-]
  * added; usePixmap() [Math-]
  * added; view() [Math-]
  * added; virtualPixel() [Math-]
  * added; visual() [Math-]
  * added; watermark() [Math-]
  * added; wave() [Math-]
  * added; whitePoint() [Math-]
  * added; whiteThreshold() [Math-]
  * added; window() [Math-]
  * added; windowGroup() [Math-]

## v1.3.2 - 06/22/2012

  * added; node >= 0.7/0.8 compat

## v1.3.1 - 06/06/2012

  * fixed; thumb() alignment and cropping [thomaschaaf]
  * added; hint when graphicsmagick is not installed (#62)
  * fixed; minify() (#59)

## v1.3.0 - 04/11/2012

  * added; flatten support [jwarchol]
  * added; background support [jwarchol]
  * fixed; identify parser error [chriso]

## v1.2.0 - 03/30/2012

  * added; extent and gravity support [jwarchol]

## v1.1.0 - 03/15/2012

  * added; filter() support [travisbeck]
  * added; density() [travisbeck]
  * fixed; permit either width or height in resize [dambalah]
  * updated; docs

## v1.0.5 - 02/15/2012

  * added; strip() support [Math-]
  * added; interlace() support [Math-]
  * added; setFormat() support [Math-]
  * fixed; regexps for image types [Math-]

## v1.0.4 - 02/09/2012

  * expose utils

## v1.0.3 - 01/27/2012

  * removed; console.log

## v1.0.2 - 01/24/2012

  * added; debugging info on parser errors
  * fixed; exports.version

## v1.0.1 - 01/12/2012

  * fixed; use of reserved keyword `super` for node v0.5+

## v1.0.0 - 01/12/2012

  * added; autoOrient support [kainosnoema] (#21)
  * added; orientation support [kainosnoema] (#21)
  * fixed; identify parser now properly JSON formats all data output by `gm identify` such as IPTC, GPS, Make, etc (#20)
  * added; support for running as imagemagick (#23, #29)
  * added; subclassing support; useful for setting default constructor options like one constructor for ImageMagick, the other for GM
  * added; more tests
  * changed; remove redundant `orientation`, `resolution`, and `filesize` from `this.data` in `indentify()`. Use their uppercase equivalents.

## v0.6.0 - 12/14/2011

  * added; stream support [kainosnoema] (#22)

## v0.5.0 - 07/07/2011

  * added; gm#trim() support [lepokle]
  * added; gm#inputIs() support
  * fixed; 'geometry does not contain image' error: gh-17

## v0.4.3 - 05/17/2011

  * added; bunch of tests
  * fixed; polygon, polyline, bezier drawing bug

## v0.4.2 - 05/10/2011

  * added; resize options support

## v0.4.1 - 04/28/2011

  * shell args are now escaped (thanks @visionmedia)
  * added; gm.in()
  * added; gm.out()
  * various refactoring

## v0.4.0 - 9/21/2010

  * removed deprecated `new` method
  * added drawing docs

## v0.3.2 - 9/06/2010

  * new images are now created using same gm() constructor

## v0.3.1 - 9/06/2010

  * can now create images from scratch
  * add type method

## v0.3.0 - 8/26/2010

  * add drawing api

## v0.2.2 - 8/22/2010

  * add quality option to thumb()
  * add teropa to contributors
  * added support for colorspace()

## v0.2.1 - 7/31/2010

  * fixed naming conflict. depth() manipulation method renamed bitdepth() 
  * added better docs

## v0.2.0 - 7/29/2010

new methods
 
  - swirl 
  - spread 
  - solarize 
  - sharpen 
  - roll 
  - sepia 
  - region 
  - raise 
  - lower 
  - paint 
  - noise 
  - negative 
  - morph 
  - median 
  - antialias 
  - limit 
  - label 
  - implode
  - gamma
  - enhance 
  - equalize 
  - emboss
  - edge
  - dither
  - monochrome
  - despeckle 
  - depth 
  - cycle 
  - contrast 
  - comment 
  - colors 

added more default args to several methods
added more examples


## v0.1.2 - 7/28/2010

  * refactor project into separate modules


## v0.1.1 - 7/27/2010

  * add modulate method
  * add colorize method
  * add charcoal method
  * add chop method
  * bug fix in write without a callback


## v0.1.0 - 6/27/2010

  * no longer supporting mogrify
  * add image data getter methods

    * size
    * format
    * color
    * res
    * depth
    * filesize
    * identify

  * add new convert methods

    * scale
    * resample
    * rotate
    * flip
    * flop
    * crop
    * magnify
    * minify
    * quality
    * blur
    * thumb


## v0.0.1 - 6/11/2010
Initial release
