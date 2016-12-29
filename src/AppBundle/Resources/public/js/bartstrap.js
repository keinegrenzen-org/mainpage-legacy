/**
 * Created by Barthy on 29.12.16.
 */
window.addEventListener("scroll", function () {
    if (window.scrollY > 200) {
        $('.navbar').addClass('navbar-full').removeClass('navbar-opaque');
    }
    else {
        $('.navbar').addClass('navbar-opaque').removeClass('navbar-full');
    }
}, false);