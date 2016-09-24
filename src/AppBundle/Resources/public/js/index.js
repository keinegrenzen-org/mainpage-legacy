$(document).ready(function () {
    $('.max-text').maxText();
    $('.counter').counterUp({
        delay: 10,
        time: 2000
    });
    var $howto = $('.howto'), $cols = $howto.find('.col-lg-3, .col-lg-1');
    $howto.waypoint(function() {
        $cols.each(function(i){
            $(this).show("slide", {direction: "left", width: ($(this).hasClass('.col-lg-3'))?(100/12)*4:(100/12) + '%', easing: 'linear', duration:600});
        });
        this.destroy();
    }, { offset: '100%' });

    $(".navbar .nav.navbar-nav.navbar-right a[href^='#']").on('click', function(e) {
        // prevent default anchor click behavior
        e.preventDefault();
        // store hash
        var hash = this.hash;
        // animate
        $('html, body').animate({
            scrollTop: $(hash).offset().top - 50
        }, 300, function(){
            // when done, add hash to url
            // (default click behaviour)
            window.location.hash = hash;
        });

    });
});

$(window).resize(function () {
    $('.max-text').maxText();
});