// Replace all URLs with Bit.ly shortened URLs.
var Bitly = require('bitly');
var hrefReplace = require('./href-replace');

var bitly = new Bitly('YOUR_USERNAME', 'YOUR_API_KEY');
var html = '\
<ul>\
  <li><a href="http://google.com">Google</a></li>\
  <li><a href="https://github.com">Github</a></li>\
</ul>';

hrefReplace(html, function(href, callback) {
    bitly.shorten(href, function(err, response) {
        //console.log(response);
        if (err) callback(err);
        else callback(null, response.data.url);
    });
}, function(err, replaced) {
    if (err) console.error(err);
    else console.log(replaced);
});