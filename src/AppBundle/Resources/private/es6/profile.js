$(document).ready(() => {

    $('.toggle-dl-dialog').click(e => {
        e.preventDefault();

        const $e = $(this),
            title = $e.data('title'),
            text = $e.data('text'),
            donate = $e.data('donate'),
            download = $e.data('download'),
            downloadUrl = $e.data('url');

        const content =
            "<div>"
            + "<p>" + text + "</p>"
            + "<a class='btn btn-dialog btn-primary my-2' target='_blank' href='" + downloadUrl + "'>" + download + "</a>"
            + "<a class='btn btn-dialog btn-success my-2' target='_blank' href='https://www.aerzte-ohne-grenzen.de/spenden-sammeln?cfd=barthyb'>" + donate + "</a>"
            + "</div>";

        e.preventDefault();
        $.dialog({
            title: title,
            content: content,
            theme: 'supervan',
            backgroundDismiss: true
        });
    });

});
