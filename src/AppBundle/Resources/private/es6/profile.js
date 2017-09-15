$(document).ready(() => {

    $('.toggle-dl-dialog').click(e => {
        e.preventDefault();

        const $e = $(e.currentTarget),
            title = $e.data('title'),
            text = $e.data('text'),
            donate = $e.data('donate'),
            download = $e.data('download'),
            downloadUrl = $e.data('url');

        const content =
            "<div>"
            + "<p class='text-big'>" + text + "</p>"
            + "<a class='btn btn-dialog btn-primary m-2 download-album' target='_blank' href='" + downloadUrl + "'>" + download + "</a>"
            + "<a class='btn btn-dialog btn-success m-2 donate-external' target='_blank' href='https://www.keinegrenzen.org/donate'>" + donate + "</a>"
            + "</div>";

        e.preventDefault();
        $.dialog({
            title: title,
            content: content,
            theme: 'supervan',
            backgroundDismiss: true
        });
    });

    const $profileHeaderTitle = $('.profile-header .page-title').not('.mobile'),
        $profileHeaerContent = $('.profile-header .profile-header-content');

    if ($profileHeaderTitle.length) {
        const toggleProfileHeader = () => {
            $profileHeaerContent.fadeToggle('slow', 'swing', () => {
                $profileHeaderTitle.toggleClass('small');
                $profileHeaerContent.fadeToggle('slow', 'swing');
            });
        };

        setTimeout(() => {
            toggleProfileHeader();
            $profileHeaerContent.on('click', toggleProfileHeader);
        }, 2200);
    }
});
