var cheerio = require('cheerio');
var hrefReplace = require('../href-replace');

module.exports = {
    "href attribute is replaced": function(test) {
        var html = '<a href="http://google.com">Google</a>';
        var newHref = "https://encrypted.google.com";
        hrefReplace(html, function(href, callback) {
            callback(null, newHref);
        }, function(err, replaced) {
            if (!err) {
                var $ = cheerio.load(replaced);
                test.equal($('a').attr('href'), newHref);
                test.done();
            }
        });
    },
    "title attribute contains the original href": function(test) {
        var original = 'http://google.com';
        var newHref = 'https://encrypted.google.com';
        var html = '<a href="' + original + '">Google</a>';

        hrefReplace(html, function(href, callback) {
            callback(null, newHref);
        }, function(err, replaced) {
            if (!err) {
                var $ = cheerio.load(replaced);
                test.equal($('a').attr('title'), original);
                test.equal($('a').attr('href'), newHref);
                test.done();
            }
        });
    },
    "original html is returned if error occurs": function(test) {
        var original = 'http://google.com';
        var html = '<a href="' + original + '">Google</a>';
        hrefReplace(html, function(href, callback) {
            callback("ERROR");
        }, function(err, replaced) {
            if (err) {
                var $ = cheerio.load(replaced);
                test.equal(html, replaced);
                test.equal($('a').attr('href'), original);
                test.done();
            }
        });
    },
    "title attribute functionality is optional": function(test) {
        var original = 'http://google.com';
        var newHref = 'https://encrypted.google.com';
        var html = '<a href="' + original + '">Google</a>';

        hrefReplace(html, function(href, callback) {
            callback(null, newHref);
        }, {
            titles: false
        }, function(err, replaced) {
            if (!err) {
                var $ = cheerio.load(replaced);
                test.notEqual($('a').attr('title'), original);
                test.equal($('a').attr('href'), newHref);
                test.done();
            }
        });
    },
    "title attribute is not modified if present": function(test) {
        var originalTitle = 'Visit Google';
        var originalHref = 'http://google.com';
        var newHref = 'https://encrypted.google.com';
        var html = '<a title="' + originalTitle + '" href="' + originalHref + '">Google</a>';

        hrefReplace(html, function(href, callback) {
            callback(null, newHref);
        }, function(err, replaced) {
            if (!err) {
                var $ = cheerio.load(replaced);
                test.equal($('a').attr('title'), originalTitle);
                test.equal($('a').attr('href'), newHref);
                test.done();
            }
        });
    }
};