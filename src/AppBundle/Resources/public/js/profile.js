$(document).ready(function () {

    $('.toggle-dl-dialog').click(function (e) {
        e.preventDefault();

        var $e = $(this),
            title = $e.data('title'),
            text = $e.data('text'),
            donate = $e.data('donate'),
            download = $e.data('download'),
            downloadUrl = $e.data('url');

        var content =
            "<div>"
            + "<p>" + text + "</p>"
            + "<a class='btn btn-dialog btn-primary' target='_blank' href='" + downloadUrl + "'>" + download + "</a>"
            + "<a class='btn btn-dialog btn-success' target='_blank' href='https://www.aerzte-ohne-grenzen.de/spenden-sammeln?cfd=barthyb'>" + donate + "</a>"
            + "</div>";

        e.preventDefault();
        $.dialog({
            title: title,
            content: content,
            theme: 'supervan',
            backgroundDismiss: true
        });
    });

    'use strict';

    var players = [];
    var playlists = [];

    var prettyTime = function (time, milli) {
        if (milli) time = time / 1000;
        var hours = Math.floor(time / 3600);
        var mins = '0' + Math.floor((time % 3600) / 60);
        var secs = '0' + Math.floor((time % 60));

        mins = mins.substr(mins.length - 2);
        secs = secs.substr(secs.length - 2);
        if (!isNaN(secs)) {
            if (hours) {
                return hours + ':' + mins + ':' + secs;
            } else {
                return mins + ':' + secs;
            }
        } else {
            return '00:00';
        }
    };

    $.fn.swapWith = function (that) {
        var $this = this;
        var $that = $(that);

        // create temporary placeholder
        var $temp = $("<div>");

        // 3-step swap
        $this.before($temp);
        $that.before($this);
        $temp.after($that).remove();

        return $this;
    };

    var $globalPlayer = $('.global-player'),
        $play = $globalPlayer.find('.fa-play'),
        $pause = $globalPlayer.find('.fa-pause'),
        $forward = $globalPlayer.find('.fa-forward'),
        $backward = $globalPlayer.find('.fa-backward'),
        $nowPlayingElapsed = $globalPlayer.find('.now-playing-elapsed'),
        $nowPlayingLength = $globalPlayer.find('.now-playing-length'),
        $nowPlayingAlbum = $globalPlayer.find('.now-playing-album'),
        $nowPlayingSong = $globalPlayer.find('.now-playing-song'),
        $nowPlayingProgress = $globalPlayer.find('.progress-bar'),
        currentPlayer = 0,
        currentSong = 0;

    var togglePlay = function (player, song, b) {
        if (currentPlayer != player) {
            players[currentPlayer].pause({
                playlistIndex: currentSong
            });
            if (b) {
                players[player].play({
                    playlistIndex: song
                });
                currentPlayer = player;
            }
        } else if (!players[player].playing) {
            if (b) {
                $play.fadeToggle(200, 'linear', function () {
                    $pause.fadeToggle(200);
                });
                players[player].play({
                    playlistIndex: song
                });
            }
        } else if (players[player]._playlistIndex != song) {
            if (b) {
                players[player].play({
                    playlistIndex: song
                });
            }
        }

        $nowPlayingLength.text(prettyTime(playlists[player].tracks[song].duration, true));
        $nowPlayingAlbum.text(playlists[player].title);
        $nowPlayingSong.text(playlists[player].tracks[song].title);

        currentPlayer = player;
        currentSong = song;
    };

    var togglePause = function (player, song) {
        if (players[player].playing) {
            $pause.fadeToggle(200, 'linear', function () {
                $play.fadeToggle(200);
            });
            players[player].pause({
                playlistIndex: song
            });
        }
    };

    var $embeds = $('.album-embed'),
        embedCnt = $embeds.length;
    $embeds.each(function (playerIndex, e) {
        var player = new SoundCloudAudio('3f0c2df99a948f8142621535b3b4ba73');
        players.push(player);
        var $this = $(this);
        $this.data('player-nr', playerIndex);
        var render = function (playlist) {
            playlists.push(playlist);
            var tracks = playlist.tracks,
                $list = $this.find('.list-group');

            for (var i = 0; i < tracks.length; i++) {
                var $listItem = $('<li class="list-group-item music-player-interaction"><span class="track-number music-player-interaction">' + ((i < 9) ? '0' + (i + 1) : (i + 1)) + '</span> <span class="title music-player-interaction">' + tracks[i].title + '</span><span class="badge music-player-interactiongit add -A' +
                    '">' + prettyTime(tracks[i].duration, true) + '</span></li>');
                $list.append($listItem);
                $listItem.click(function () {
                    togglePlay(playerIndex, $(this).index(), true);
                });
            }

            var renderTimer = function () {
                var time = prettyTime(new Date(player.audio.currentTime), false);
                $nowPlayingElapsed.text(time);
                var percent = 100 * Math.floor(player.audio.currentTime) / Math.floor(player.audio.duration);
                $nowPlayingProgress.attr('aria-valuenow', percent);
                $nowPlayingProgress.width(percent + "%");
            };

            // render timer on every second
            player.on('timeupdate', renderTimer);
            renderTimer();

            player.on('ended', function () {
                var next = currentSong + 1;
                if (next < tracks.length) {
                    togglePlay(playerIndex, next, true);
                }
            });

            if (--embedCnt == 0) {
                togglePlay(currentPlayer, currentSong, false);
            }
        };
        player.resolve($this.attr('data-sc'), render);
    });

    $play.click(function () {
        togglePlay(currentPlayer, currentSong, true);
    });

    $pause.click(function () {
        togglePause(currentPlayer, currentSong);
    });

    $forward.click(function () {
        if (currentSong + 1 < playlists[currentPlayer].tracks.length) {
            togglePlay(currentPlayer, currentSong + 1, true);
        }
    });

    $backward.click(function () {
        if (currentSong - 1 >= 0) {
            togglePlay(currentPlayer, currentSong - 1, true);
        }
    });

    $('.album-art-container > div').each(function () {
        var $this = $(this),
            uurl = $this.data('uurl');
        $this.click(function () {
            if (!$this.hasClass('col-lg-12')) {
                var $currentlyActive = $this.parent().find('.col-lg-12');
                var $last = $this.parent().find('.col-lg-6').last();
                $this.swapWith($last);
                $currentlyActive.swapWith($this);

                $currentlyActive.addClass('col-lg-6');
                $currentlyActive.removeClass('col-lg-12');

                $this.addClass('col-lg-12');
                $this.removeClass('col-lg-6');

                var $detailsThis = $('.album-details.album-' + uurl),
                    $detailsCurrentlyActive = $('.album-details.album-' + $currentlyActive.data('uurl'));

                $detailsCurrentlyActive.removeClass('active').fadeOut(function () {
                    $detailsThis.addClass('active');
                });
            }
        });
    });

});