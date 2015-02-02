// Requires:

var async = require('async');
var cheerio = require('cheerio');
var merge = require('merge');


// Default options:

var defaults = {
    titles: true
};


// Exports

module.exports = function hrefReplace(html, replacer, options, done) {
    if (typeof(options) === 'function') {
        // No options provided.
        done = options;
        options = {};
    }

    var config = merge({}, defaults, options);

    var $ = cheerio.load(html);

    var anchors = $('a');
    async.map(anchors.get(),
        function(anchor, cb) {
            var href = $(anchor).attr('href');
            replacer(href, cb);
        },
        function(err, replaced) {
            if (err) {
                // Return the error and the original HTML.
                return done(err, html);
            }
            else {
                // Replace the hrefs
                anchors.each(function(idx, a) {
                    var url = replaced[idx];
                    if (url) {
                        var anchor = $(a);
                        if (config.titles && !anchor.attr('title')) {
                            anchor.attr('title', anchor.attr('href'));
                        }
                        anchor.attr('href', url);
                    }
                });
                // Done!
                done(null, $.html());
            }
        });
};