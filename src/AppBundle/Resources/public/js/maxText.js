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
