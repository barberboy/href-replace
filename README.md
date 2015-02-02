href-replace
============
For each `a` element in a string of HTML, replace the `href` attribute with a new value provided by the `replacer` function.

Usage
-----
```sh
npm install href-replace
```

API Documentation
-----------------

### hrefReplace(html, replacer[, options], done)

- `html` : A String containing the original HTML to
    transform
- `replacer(href, callback)`: A Function to do the transforming. The function
    is passed the following arguments:
    - `href`: The original value for the `href`
        attribute.
    - `callback(err, transformed)`: A callback
        Function which must be called with error
        (which can be null) and the new `href` value.
- `options` : An (optional) object specifying the following
    options:
    - `titles`: A Boolean specifying whether or not
        to set the `a` element's `title` attribute
        to the original `href` value. Default is
        `true`.
- `done(err, html)`: A callback Function which will be called when
    all the transforms have been completed or when
    an error occurs. The `done` callback will be
    called with the following arguments:

    - `err`: The error returned by the `replacer`
       function at the time it occurred, or `null`
       if no error occured.
    - `html`: The new HTML with all the `href`s replaced.

Example
-------
```javascript
// Replace all URLs with Bit.ly shortened URLs.
var Bitly = require('bitly')
var hrefReplace = require('href-replace')

var bitly = new Bitly('YOUR_USERNAME', 'YOUR_API_KEY')
var html = '\
<ul>\
  <li><a href="http://google.com">Google</a></li>\
  <li><a href="https://github.com">Github</a></li>\
</ul>'

hrefReplace(html, function(href, callback) {
    bitly.shorten(href, function(err, response) {
        //console.log(response)
        if (err) callback(err)
        else callback(null, response.data.url)
    });
}, function(err, replaced) {
    if (err) console.error(err)
    else console.log(replaced)
});
```

See [examples] directory for more complete examples.

[examples]: https://github.com/barberboy/href-replace/tree/master/examples


License
-------
The MIT License (MIT)
Copyright © 2015 Benjamin Barber

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
