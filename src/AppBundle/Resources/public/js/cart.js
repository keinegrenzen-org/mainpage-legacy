function countItems() {
    var $cartItems = $('.cart-items'),
        $cartTotal = $('.cart-total > span'),
        $cartSubmit = $('.btn-donate'),
        cnt = $cartItems.find('li:not(.empty-list)').length,
        price = '';
    if (cnt > 0) {
        $cartItems.find('.empty-list').css('display', 'none');
        $cartItems.parent().find('.btn-donate').removeAttr('disabled');
    } else {
        $cartItems.find('.empty-list').css('display', 'list-item');
        $cartItems.parent().find('.btn-donate').attr('disabled', 'true');
    }
    switch (cnt) {
        case 0:
            price = '0,00';
            break;
        case 1:
            price = '5.00';
            break;
        case 2:
            price = '10.00';
            break;
        case 3:
        case 4:
            price = '15.00';
            break;
        default:
            price = '20.00';
            break;
    }

    $cartSubmit.prop('disabled', (cnt == 0));
    $cartTotal.text(price);
    $cartItems.find('li:not(.empty-list)').each(function (i) {
        sessionStorage.setItem("cart-" + i, '<li data-uurl="' + $(this).attr('data-uurl') + '">' + $(this).html() + '</li>');
    });
    sessionStorage.setItem("cart-cnt", cnt);
}

function addToCart($cartItems, $newItem, $btn) {
    $cartItems.append($newItem);
    $newItem.find('.fa-remove').click(function () {
        removeFromCart($cartItems, $newItem);
    });
    $newItem.find('input').val($newItem.data("uurl"));
    if ($btn == null) {
        $btn = $('#add-' + $newItem.data('uurl'));
    }
    $btn.addClass('in-cart');

    countItems();
}

function removeFromCart($cartItems, $newItem) {
    $cartItems.find("[data-uurl='" + $newItem.data('uurl') + "']").remove();
    $('#add-' + $newItem.data('uurl')).removeClass('in-cart').removeClass('disabled');
    countItems();
}

$(document).ready(function () {
    var cartCnt = sessionStorage.getItem("cart-cnt");

    var $cartButton = $('.cart-button'),
        $cartItems = $('.cart-items'),
        $cartTotal = $('.cart-total'),
        $cart = $('.shopping-cart'),
        $cartInner = $('.cart-inner'),
        $li = $("<li><span class='text-bold album-name'></span> - <span class='album-artist'></span><span class='fa fa-remove'><spam class='sr-only'>remove item</spam></span><input class='hidden' type='text'/></li>"),
        open = false;

    if (cartCnt != null) {
        for (var i = 0; i < cartCnt; i++) {
            addToCart($cartItems, $(sessionStorage.getItem("cart-" + i)));
        }
        countItems();
    }

    $cartButton.click(function (e) {
        e.preventDefault();
        open = !open;
        $cart.animate({
            height: open ? $cartInner.outerHeight() : '0',
            padding: open ? '15px' : '0'
        }, .500, 'linear');
        if (!open) {
            $cartButton.blur();
        }
    });
    $cartTotal.waypoint({
        handler: function () {
            if (open) {
                $cartButton.click();
            }
        },
        offset: 10
    });

    $('.album-add-to-cart').each(function (i) {
        var $element = $(this);
        $element.click(function (event) {
            event.preventDefault();
            var $tmpLi = $li.clone();
            $tmpLi.find('.album-name').text($element.attr("data-album"));
            $tmpLi.find('.album-artist').text($element.attr("data-artist"));
            $tmpLi.attr('data-uurl', $element.data("uurl"));
            var which = sessionStorage.getItem("cart-cnt");
            $tmpLi.find('input').attr('name', 'album_' + which);
            $tmpLi.find('input').attr('id', 'album_' + which);
            if (!$element.hasClass('in-cart')) {
                addToCart($cartItems, $tmpLi, $element);
                $element.addClass('disabled');
            }
            $element.blur();
        })
    });

    $cartTotal.next('.btn-donate').click(function (e) {
        if ($(this).attr('disabled')) {
            e.preventDefault();
        }
    });

});