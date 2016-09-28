/**
 * Created by Barthy on 06.05.16.
 */


function dot2(input) {
    return Math.round(input * 100) / 100;
}

$(document).ready(function () {
    /*$('input').each(function (k, v) {
     if ($(this).attr('_type')) {
     $(this).prop('type', $(this).attr('_type'));
     }
     });*/

    $('#album_cover').find('.easyadmin-vich-image input').change(function () {
        var $imgContainer = $('#album_cover').find('.field-vich_image > .easyadmin-vich-image');
        $imgContainer.on("DOMSubtreeModified", function () {
            var $img = $imgContainer.find('.easyadmin-lightbox img');
            if ($img.length > 0) {
                var colorThief = new ColorThief();
                $img.attr('id', 'album_cover_lightbox');

                var palette = colorThief.getPalette(document.getElementById('album_cover_lightbox'), 3, 10);

                var background = "rgb(" + palette[0][0] + ", " + palette[0][1] + ", " + palette[0][2] + ")";
                var primary = "rgb(" + palette[1][0] + ", " + palette[1][1] + ", " + palette[1][2] + ")";
                var secondary = "rgb(" + palette[2][0] + ", " + palette[2][1] + ", " + palette[2][2] + ")";

                $('.field-background').css('backgroundColor', background).val(background);
                $('.field-primary').css('backgroundColor', primary).val(primary);
                $('.field-secondary').css('backgroundColor', secondary).val(secondary)
                $imgContainer.off("DOMSubtreeModified");
            }
        });
    });
});