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