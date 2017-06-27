/**
 * Created by Barthy on 27.06.17.
 */

export default class SoundCloudPlayer {

    constructor($container) {
        this.players = [];
        this.playlists = [];

        this.$btnPlay = $container.find('.fa-play');
        this.$btnPause = $container.find('.fa-pause');
        this.$btnForward = $container.find('.fa-forward');
        this.$btnBackward = $container.find('.fa-backward');
        this.$nowPlayingElapsed = $container.find('.now-playing-elapsed');
        this.$nowPlayingLength = $container.find('.now-playing-length');
        this.$nowPlayingAlbum = $container.find('.now-playing-album');
        this.$nowPlayingSong = $container.find('.now-playing-song');
        this.$nowPlayingProgress = $container.find('.progress-bar');

        this.currentPlayer = 0;
        this.currentSong = 0;

        const $embeds = $('.album-embed');
        $embeds.each((embedElement, embedIndex) => {
            const player = new SoundCloudAudio('3f0c2df99a948f8142621535b3b4ba73');
            this.players.push(player);

            const $embedElement = $(embedElement);

            $embedElement.data('player-nr', embedIndex);
            player.resolve(
                $embedElement.attr('data-sc'),
                playlist => {
                    this.playlists.push(playlist);
                    const tracks = playlist.tracks,
                        $list = $embedElement.find('.list-group');

                    for (let i = 0; i < tracks.length; i++) {
                        const $listItem = $(
                            '<li class="list-group-item">' +
                            '<span class="track-number ">' + ((i < 9) ? '0' + (i + 1) : (i + 1)) + '</span>' +
                            '<span class="title">' + tracks[i].title + '</span>' +
                            '<span class="track-duration">' + SoundCloudPlayer.formatTime(tracks[i].duration, true) + '</span>' +
                            '</li>'
                        );

                        $list.append($listItem);
                        $listItem.on('click', () => {
                            this.togglePlay(embedIndex, i, true);
                        });
                    }

                    // render timer on every second
                    player.on('timeupdate', () => {
                        const time = SoundCloudPlayer.formatTime(new Date(player.audio.currentTime), false);
                        this.$nowPlayingElapsed.text(time);
                        const percent = 100 * Math.floor(player.audio.currentTime) / Math.floor(player.audio.duration);
                        this.$nowPlayingProgress.attr('aria-valuenow', percent);
                        this.$nowPlayingProgress.width(percent + "%");
                    });

                    player.on('ended', () => {
                        const next = this.currentSong + 1;
                        if (next < tracks.length) {
                            this.togglePlay(embedIndex, next, true);
                        }
                    });

                    if (embedIndex === $embeds.length) {
                        this.togglePlay(this.currentPlayer, this.currentSong, false);
                    }
                }
            );
        });

        this.$btnPlay.on('click', () => {
            this.togglePlay(this.currentPlayer, this.currentSong, true);
        });

        this.$btnPause.on('click', () => {
            this.togglePause(this.currentPlayer, this.currentSong);
        });

        this.$btnForward.on('click', () => {
            if (this.currentSong + 1 < this.playlists[this.currentPlayer].tracks.length) {
                this.togglePlay(this.currentPlayer, this.currentSong + 1, true);
            }
        });

        this.$btnBackward.on('click', () => {
            if (this.currentSong - 1 >= 0) {
                this.togglePlay(this.currentPlayer, this.currentSong - 1, true);
            }
        });
    }

    static formatTime(time, milli) {
        if (milli) time = time / 1000;
        const hours = Math.floor(time / 3600);
        let mins = '0' + Math.floor((time % 3600) / 60);
        let secs = '0' + Math.floor((time % 60));

        mins = mins.substr(mins.length - 2);
        secs = secs.substr(secs.length - 2);

        if (!isNaN(parseInt(secs))) {
            if (hours) {
                return hours + ':' + mins + ':' + secs;
            } else {
                return mins + ':' + secs;
            }
        } else {
            return '00:00';
        }
    };

    static swapWith($this, $that) {
        // create temporary placeholder
        const $temp = $("<div>");

        // 3-step swap
        $this.before($temp);
        $that.before($this);
        $temp.after($that).remove();
    };

    togglePlay(playerIndex, songIndex, b) {
        if (this.currentPlayer !== playerIndex) {
            this.players[this.currentPlayer].pause({
                playlistIndex: this.currentSong
            });
            if (b) {
                this.players[playerIndex].play({
                    playlistIndex: songIndex
                });
                this.currentPlayer = playerIndex;
            }
        } else if (b && !this.players[playerIndex].playing) {
            this.$btnPlay.fadeToggle(200, 'linear', function () {
                this.$btnPause.fadeToggle(200);
            });
            this.players[playerIndex].play({
                playlistIndex: songIndex
            });
        } else if (b && this.players[playerIndex]._playlistIndex !== songIndex) {
            this.players[playerIndex].play({
                playlistIndex: songIndex
            });
        }

        this.$nowPlayingLength.text(SoundCloudPlayer.formatTime(this.playlists[playerIndex].tracks[songIndex].duration, true));
        this.$nowPlayingAlbum.text(this.playlists[playerIndex].title);
        this.$nowPlayingSong.text(this.playlists[playerIndex].tracks[songIndex].title);

        this.currentPlayer = playerIndex;
        this.currentSong = songIndex;
    };

    togglePause(playerIndex, songIndex) {
        if (this.players[playerIndex].playing) {
            this.$btnPause.fadeToggle(200, 'linear', function () {
                this.$btnPlay.fadeToggle(200);
            });
            this.players[playerIndex].pause({
                playlistIndex: songIndex
            });
        }
    };

}