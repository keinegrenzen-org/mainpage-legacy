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