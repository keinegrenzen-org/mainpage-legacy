/*!
* jquery.counterup.js 1.0
*
* Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
* Released under the GPL v2 License
*
* Date: Nov 26, 2013
*/
(function( $ ){
  "use strict";

  $.fn.counterUp = function( options ) {

    // Defaults
    var settings = $.extend({
        'time': 400,
        'delay': 10
    }, options);

    return this.each(function(){

        // Store the object
        var $this = $(this);
        var $settings = settings;

        var counterUpper = function() {
            var nums = [];
            var divisions = $settings.time / $settings.delay;
            var num = $this.text();
            var isComma = /[0-9]+,[0-9]+/.test(num);
            num = num.replace(/,/g, '');
            var isFloat = /^[0-9]+\.[0-9]+$/.test(num);

            // Generate list of incremental numbers to display
            for (var i = divisions; i >= 1; i--) {

                // Preserve as int if input was int
                var newNum = parseInt(num / divisions * i);

                // Preserve float if input was float
                if (isFloat) {
                    newNum = parseFloat(num / divisions * i);
                }

                // Preserve commas if input had commas
                if (isComma) {
                    var string = newNum.toString();
                    newNum = string.substring(0, string.length-2) + ',' + string.substring(string.length-2, string.length);
                }

                nums.unshift(newNum);
            }

            $this.data('counterup-nums', nums);
            $this.text('0');

            // Updates the number until we're done
            var f = function() {
                $this.text($this.data('counterup-nums').shift());
                if ($this.data('counterup-nums').length) {
                    setTimeout($this.data('counterup-func'), $settings.delay);
                } else {
                    if (isComma) {
                        var string = num.toString();
                        num = string.substring(0, string.length - 2) + ',' + string.substring(string.length - 2, string.length);
                        $this.text(num);
                    }
                        delete $this.data('counterup-nums');
                        $this.data('counterup-nums', null);
                        $this.data('counterup-func', null);
                }
            };
            $this.data('counterup-func', f);

            // Start the count up
            setTimeout($this.data('counterup-func'), $settings.delay);
            this.destroy();
        };

        // Perform counts when the element gets into view
        $this.waypoint(counterUpper, { offset: '100%' });
    });

  };

})( jQuery );
jQuery.fn.hasHScroll = function () {
    return this.get(0).scrollWidth > this.width();
};

jQuery.fn.hasOverflow = function () {
    return !!(this.get(0).offsetHeight < this.get(0).scrollHeight ||
    this.get(0).offsetWidth < this.get(0).scrollWidth);
};

//util function to check if an element has a vertical scrollbar present
jQuery.fn.hasVScrollBar = function () {
    return this.get(0).scrollHeight > this.height();
};

(function ($) {
    $.fn.maxText = function () {
        return this.each(function () {
            var $this = $(this), height = 0;
            if ($this.find('.counter').length > 0) {
                height = ($this.width() / ($this.text().length + 1)) * 1.8667;
            } else {
                height = ($this.width() / $this.text().length) * 1.8667;
            }
            height = (height > $this.height()) ? $this.height() : height;
            $this.css('fontSize', height + 'px');
            $this.css('lineHeight', height + 'px');
            $this.css('height', height + 'px');
        });
    };
})(jQuery);

$(document).ready(function () {
    $('.max-text').maxText();
    $('.counter').counterUp({
        delay: 10,
        time: 2000
    });

    $(".navbar .nav.navbar-nav.navbar-right a[href^='#']").on('click', function (e) {
        // prevent default anchor click behavior
        e.preventDefault();
        // store hash
        var hash = this.hash;
        // animate
        $('html, body').animate({
            scrollTop: $(hash).offset().top - 50
        }, 300, function () {
            // when done, add hash to url
            // (default click behaviour)
            window.location.hash = hash;
        });

    });
});

$(window).resize(function () {
    $('.max-text').maxText();
});
window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function(f) {
        t._e.push(f);
    };

    return t;
}(document, "script", "twitter-wjs"));

$(document).ready(function () {
    $("a[href^='#albums']").on('click', function(e) {
        // prevent default anchor click behavior
        e.preventDefault();
        // store hash
        var hash = this.hash;
        // animate
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 300, function () {
            // when done, add hash to url
            // (default click behaviour)
            window.location.hash = hash;
        });
    });
    $('#share-fb').click(function (e) {
        e.preventDefault();
        FB.ui({
            method: 'share',
            mobile_iframe: true,
            href: 'https://www.keinegrenzen.org/'
        }, function(response){});
    });
});