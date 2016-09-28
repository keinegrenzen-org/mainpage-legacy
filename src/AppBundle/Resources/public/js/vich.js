/**
 * Created by Barthy on 05.05.16.
 */
function readUrl(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var $img = $('<img/>')
                .attr('src', e.target.result)
                .attr('width', 'auto')
                .attr('height', 'auto');
            var $thumbImg = $(input).parent().parent().find('.easyadmin-thumbnail img');
            var $boxImg = $(input).parent().parent().find('.easyadmin-lightbox img');
            if ($thumbImg.length > 0 && $boxImg.length > 0) {
                $img.insertBefore($thumbImg);
                $img.next('img').remove();
                $img.clone().insertBefore($boxImg)
                    .next('img').remove();
            } else {
                $('<a href="#" class="easyadmin-thumbnail" data-featherlight="#easyadmin-lightbox-frontpage_image_file" data-featherlight-close-on-click="anywhere"></a>').append($img).insertAfter($(input).parent());
                $('<div id="easyadmin-lightbox-frontpage_image_file" class="easyadmin-lightbox"></div>').append($img.clone()).insertAfter('.easyadmin-thumbnail');
                $(input).parents('.col-sm-10').find('.empty.collection-empty').remove();
            }
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function readFileName(input) {
    if (input.files && input.files[0]) {
        var $img = $('<div class="fileName"></div>').append($('<p/>').text(input.files[0].name));
        $img.insertBefore($(input).parent('.fileinput-button'));
        $img.prev('.fileName').remove();
    }
}

$(document).ready(function () {
    // VICH
    $('.easyadmin-vich-image input').each(function () {
        $(this).wrap('<span class="btn btn-file fileinput-button margin-r-5">');
        $('<i class="fa fa-upload"></i>').insertBefore(this);
        $(this).change(function () {
            readUrl(this);
        });
    });

    $('.vich-file input').each(function () {
        $(this).change(function () {
            readFileName(this);
        });
    });
});