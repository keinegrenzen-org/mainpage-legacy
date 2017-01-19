/*! js-url - v2.3.0 - 2016-03-10 */window.url=function(){function a(){}function b(a){return decodeURIComponent(a.replace(/\+/g," "))}function c(a,b){var c=a.charAt(0),d=b.split(c);return c===a?d:(a=parseInt(a.substring(1),10),d[0>a?d.length+a:a-1])}function d(a,c){for(var d=a.charAt(0),e=c.split("&"),f=[],g={},h=[],i=a.substring(1),j=0,k=e.length;k>j;j++)if(f=e[j].match(/(.*?)=(.*)/),f||(f=[e[j],e[j],""]),""!==f[1].replace(/\s/g,"")){if(f[2]=b(f[2]||""),i===f[1])return f[2];h=f[1].match(/(.*)\[([0-9]+)\]/),h?(g[h[1]]=g[h[1]]||[],g[h[1]][h[2]]=f[2]):g[f[1]]=f[2]}return d===a?g:g[i]}return function(b,e){var f,g={};if("tld?"===b)return a();if(e=e||window.location.toString(),!b)return e;if(b=b.toString(),f=e.match(/^mailto:([^\/].+)/))g.protocol="mailto",g.email=f[1];else{if((f=e.match(/(.*?)\/#\!(.*)/))&&(e=f[1]+f[2]),(f=e.match(/(.*?)#(.*)/))&&(g.hash=f[2],e=f[1]),g.hash&&b.match(/^#/))return d(b,g.hash);if((f=e.match(/(.*?)\?(.*)/))&&(g.query=f[2],e=f[1]),g.query&&b.match(/^\?/))return d(b,g.query);if((f=e.match(/(.*?)\:?\/\/(.*)/))&&(g.protocol=f[1].toLowerCase(),e=f[2]),(f=e.match(/(.*?)(\/.*)/))&&(g.path=f[2],e=f[1]),g.path=(g.path||"").replace(/^([^\/])/,"/$1").replace(/\/$/,""),b.match(/^[\-0-9]+$/)&&(b=b.replace(/^([^\/])/,"/$1")),b.match(/^\//))return c(b,g.path.substring(1));if(f=c("/-1",g.path.substring(1)),f&&(f=f.match(/(.*?)\.(.*)/))&&(g.file=f[0],g.filename=f[1],g.fileext=f[2]),(f=e.match(/(.*)\:([0-9]+)$/))&&(g.port=f[2],e=f[1]),(f=e.match(/(.*?)@(.*)/))&&(g.auth=f[1],e=f[2]),g.auth&&(f=g.auth.match(/(.*)\:(.*)/),g.user=f?f[1]:g.auth,g.pass=f?f[2]:void 0),g.hostname=e.toLowerCase(),"."===b.charAt(0))return c(b,g.hostname);a()&&(f=g.hostname.match(a()),f&&(g.tld=f[3],g.domain=f[2]?f[2]+"."+f[3]:void 0,g.sub=f[1]||void 0)),g.port=g.port||("https"===g.protocol?"443":"80"),g.protocol=g.protocol||("443"===g.port?"https":"http")}return b in g?g[b]:"{}"===b?g:void 0}}(),"undefined"!=typeof jQuery&&jQuery.extend({url:function(a,b){return window.url(a,b)}});
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;"undefined"!=typeof window?e=window:"undefined"!=typeof global?e=global:"undefined"!=typeof self&&(e=self),e.SoundCloudAudio=t()}}(function(){return function t(e,i,r){function o(s,a){if(!i[s]){if(!e[s]){var l="function"==typeof require&&require;if(!a&&l)return l(s,!0);if(n)return n(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var p=i[s]={exports:{}};e[s][0].call(p.exports,function(t){var i=e[s][1][t];return o(i?i:t)},p,p.exports,t,e,i,r)}return i[s].exports}for(var n="function"==typeof require&&require,s=0;s<r.length;s++)o(r[s]);return o}({1:[function(t,e){"use strict";function i(t){n||(n=document.createElement("a")),n.href=t||"";for(var e={},i=0,r=s.length;r>i;i++){var o=s[i];e[o]=n[o]}return e}function r(t,e,r){var o=i(t),n=/\?(?:.*)$/,s=n.test(o.search)?"&":"?",a=o.protocol+"//"+o.host+o.port+o.pathname+o.search+s+e+"="+r+o.hash;return a}function o(t){if(!(this instanceof o))return new o(t);if(!t)throw new Error("SoundCloud API clientId is required, get it - https://developers.soundcloud.com/");this._events={},this._clientId=t,this._baseUrl="https://api.soundcloud.com",this.playing=!1,this.duration=0,this.audio=document.createElement("audio")}var n,s="protocol hostname host pathname port search hash href".split(" ");o.prototype.resolve=function(t,e){if(!t)throw new Error("SoundCloud track or playlist url is required");var r=this._baseUrl+"/resolve.json?url="+encodeURIComponent(t)+"&client_id="+this._clientId;this._jsonp(r,function(r){if(this.cleanData(),Array.isArray(r)){var o=r;r={tracks:o},this._playlist=r}else if(r.tracks)this._playlist=r;else{this._track=r;var n=i(t);this._track.stream_url+=n.hash}this.duration=r.duration&&!isNaN(r.duration)?r.duration/1e3:0,e(r)}.bind(this))},o.prototype._jsonp=function(t,e){var i=document.getElementsByTagName("script")[0]||document.head,o=document.createElement("script"),n="jsonp_callback_"+(new Date).valueOf();window[n]=function(t){o.parentNode&&o.parentNode.removeChild(o),window[n]=function(){},e(t)},o.src=r(t,"callback",n),i.parentNode.insertBefore(o,i)},o.prototype.on=function(t,e){this._events[t]=e,this.audio.addEventListener(t,e,!1)},o.prototype.off=function(t,e){this._events[t]=null,this.audio.removeEventListener(t,e)},o.prototype.unbindAll=function(){for(var t in this._events){var e=this._events[t];e&&this.off(t,e)}},o.prototype.preload=function(t){this._track={stream_url:t},this.audio.src=r(t,"client_id",this._clientId)},o.prototype.play=function(t){t=t||{};var e;if(t.streamUrl)e=t.streamUrl;else if(this._playlist){var i=this._playlist.tracks.length;if(i){if(this._playlistIndex=t.playlistIndex||0,this._playlistIndex>=i||this._playlistIndex<0)return void(this._playlistIndex=0);e=this._playlist.tracks[this._playlistIndex].stream_url}}else this._track&&(e=this._track.stream_url);if(!e)throw new Error("There is no tracks to play, use `streamUrl` option or `load` method");e=r(e,"client_id",this._clientId),e!==this.audio.src&&(this.audio.src=e),this.playing=e,this.audio.play()},o.prototype.pause=function(){this.audio.pause(),this.playing=!1},o.prototype.stop=function(){this.audio.pause(),this.audio.currentTime=0,this.playing=!1},o.prototype.next=function(){var t=this._playlist.tracks.length;this._playlistIndex>=t-1||this._playlist&&t&&this.play({playlistIndex:++this._playlistIndex})},o.prototype.previous=function(){this._playlistIndex<=0||this._playlist&&this._playlist.tracks.length&&this.play({playlistIndex:--this._playlistIndex})},o.prototype.seek=function(t){if(!this.audio.readyState)return!1;var e=t.offsetX/t.target.offsetWidth||(t.layerX-t.target.offsetLeft)/t.target.offsetWidth;this.audio.currentTime=e*(this.audio.duration||0)},o.prototype.cleanData=function(){this._track=void 0,this._playlist=void 0},e.exports=o},{}]},{},[1])(1)});
(function (global) {
    'use strict';

    var players = [];
    var playlists = [];

    var prettyTime = function (time, milli = false) {
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

    var togglePlay = function (player, song, b = true) {
        if (currentPlayer != player) {
            players[currentPlayer].pause({
                playlistIndex: currentSong
            });
            if (b) {
                players[player].play({
                    playlistIndex: song
                });
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
        var player = global.player = new SoundCloudAudio('3f0c2df99a948f8142621535b3b4ba73');
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
                    togglePlay(playerIndex, $(this).index());
                });
            }

            var renderTimer = function () {
                var time = prettyTime(new Date(player.audio.currentTime));
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
                    togglePlay(playerIndex, next);
                }
            });

            if (--embedCnt == 0) {
                togglePlay(currentPlayer, currentSong, false);
            }
        };
        player.resolve($this.attr('data-sc'), render);
    });

    $play.click(function () {
        togglePlay(currentPlayer, currentSong);
    });

    $pause.click(function () {
        togglePause(currentPlayer, currentSong);
    });

    $forward.click(function () {
        if (currentSong + 1 < playlists[currentPlayer].tracks.length) {
            togglePlay(currentPlayer, currentSong + 1);
        }
    });

    $backward.click(function () {
        if (currentSong - 1 >= 0) {
            togglePlay(currentPlayer, currentSong - 1);
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
})(this);