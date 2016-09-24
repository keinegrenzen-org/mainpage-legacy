/**
 * Created by Barthy on 20.04.16.
 */
$(document).ready(function() {
    var $scPlayers = $('.embed-2 > iframe');
    $scPlayers.each(function () {
        var $url = $(this).attr('src'),
            songUrl = $.url('?url', $url),
            widget = SC.Widget(this);

        widget.load(songUrl, {
            show_artwork: false,
            show_user: false,
            buying: false,
            download: false,
            color: '609e55'
        });
    });
});