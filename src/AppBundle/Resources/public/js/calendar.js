/**
 * Created by Barthy on 18.01.17.
 */
$(window).load(function () {
    var $userInfo = $('.user-info'),
        user = $userInfo.data('name'),
        role = $userInfo.data('role'),
        $btns = $('.btn-calendar');

    $btns.each(function () {

        var $e = $(this);
        var camOp = $e.data('cam');
        var artist = $e.data('art');
        var $artistSpan = $e.find('span.artist');
        var $camOpSpan = $e.find('span.camop');

        if (user == camOp || user == artist) {
            $e.parent().addClass('reserved');
        }


        $e.click(function () {
            if ($e.parent().hasClass('reserved')) {
                $.post('/planung/free', {id: $e.data('id'), name: user, role: role}).done(function () {
                    $e.parent().removeClass('reserved');
                    if (role == 'cam') {
                        $camOpSpan.empty();
                    } else if (role == 'art') {
                        $artistSpan.empty();
                    }
                });
            } else {
                $.post('/planung/reserve', {id: $e.data('id'), name: user, role: role}).done(function () {
                    $e.parent().addClass('reserved');
                    if (role == 'cam') {
                        console.log($camOpSpan.text(name));
                        $camOpSpan.text(name);
                    } else if (role == 'art') {
                        $artistSpan.text(name);
                    }
                });
            }
        })
    })
});