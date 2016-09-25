var clientToken = $('#braintree-token').val();
braintree.setup(clientToken, "dropin", {
    container: "payment-form",
    paypal: {
        singleUse: true,
        amount: $('#donation-amount').val(),
        currency: 'EUR',
        button: {
            type: 'checkout'
        }
    },
    onError: function (obj) {
        if (obj.type == 'VALIDATION') {
            alert("INVALID FIELDS");
        } else if (obj.type == 'SERVER') {
            alert(obj.message);
        }
    }
});
$(window).load(function () {
   var $amount = $('#donation_amount');

    $amount.keypress(function () {
        console.log(parseFloat($amount.val()));
    });
});