/**
 * Created by Barthy on 27.06.17.
 */

export default class SoundCloudPlayer {

  get $nowPlayingProgress () {
    return this._$nowPlayingProgress
  }

  set $nowPlayingProgress (value) {
    this._$nowPlayingProgress = value
  }

  get $nowPlayingSong () {
    return this._$nowPlayingSong
  }

  set $nowPlayingSong (value) {
    this._$nowPlayingSong = value
  }

  get $nowPlayingAlbum () {
    return this._$nowPlayingAlbum
  }

  set $nowPlayingAlbum (value) {
    this._$nowPlayingAlbum = value
  }

  get $nowPlayingLength () {
    return this._$nowPlayingLength
  }

  set $nowPlayingLength (value) {
    this._$nowPlayingLength = value
  }

  get $nowPlayingElapsed () {
    return this._$nowPlayingElapsed
  }

  set $nowPlayingElapsed (value) {
    this._$nowPlayingElapsed = value
  }

  get $btnBackward () {
    return this._$btnBackward
  }

  set $btnBackward (value) {
    this._$btnBackward = value
  }

  get $btnForward () {
    return this._$btnForward
  }

  set $btnForward (value) {
    this._$btnForward = value
  }

  get $btnPause () {
    return this._$btnPause
  }

  set $btnPause (value) {
    this._$btnPause = value
  }

  get $btnPlay () {
    return this._$btnPlay
  }

  set $btnPlay (value) {
    this._$btnPlay = value
  }

  constructor ($container) {
    this.players = []

    this.$btnPlay = $container.find('.player-control.play')
    this.$btnPause = $container.find('.player-control.pause')
    this.$btnForward = $container.find('.player-control.forward')
    this.$btnBackward = $container.find('.player-control.backward')
    this.$nowPlayingElapsed = $container.find('.now-playing-elapsed')
    this.$nowPlayingLength = $container.find('.now-playing-length')
    this.$nowPlayingAlbum = $container.find('.now-playing-album')
    this.$nowPlayingSong = $container.find('.now-playing-song')
    this.$nowPlayingProgress = $container.find('.progress-bar')

    this.currentPlayer = 0
    this.currentSong = 0

    const $embeds = $('.album-embed')
    $embeds.each(embedIndex => {
      const player = new SoundCloudAudio('3f0c2df99a948f8142621535b3b4ba73')
      this.players.push(player)

      const $embedElement = $embeds.eq(embedIndex)
      const secondaryColor = $embedElement.data('color-secondary')

      $embedElement.data('player-nr', embedIndex)
      player.resolve(
        $embedElement.attr('data-sc'),
        playlist => {
          const tracks = playlist.tracks,
            $list = $embedElement.find('.list-group')

          for (let i = 0; i < tracks.length; i++) {
            const $listItem = $(
              '<li class="list-group-item">' +
              '<span style="color: ' + secondaryColor + '" class="track-number">' + ((i < 9) ? '0' + (i + 1) : (i + 1)) + '</span>' +
              '<span class="title">' + tracks[i].title + '</span>' +
              '<span style="color: ' + secondaryColor + '" class="track-duration">' + SoundCloudPlayer.formatTime(tracks[i].duration, true) + '</span>' +
              '</li>'
            )

            $list.append($listItem)
            $listItem.on('click', () => {
              this.play(embedIndex, i)
            })
          }

          // render timer on every second
          player.on('timeupdate', () => {
            const time = SoundCloudPlayer.formatTime(new Date(player.audio.currentTime), false)
            this.$nowPlayingElapsed.text(time)
            const percent = 100 * Math.floor(player.audio.currentTime) / Math.floor(player.audio.duration)
            this.$nowPlayingProgress.attr('aria-valuenow', percent)
            this.$nowPlayingProgress.width(percent + '%')
          })

          player.on('ended', () => {
            const next = this.currentSong + 1
            if (next < tracks.length) {
              this.play(embedIndex, next)
            }
          })

          if (embedIndex === 0) {
            this.updatePlayer()
          }
        }
      )
    })

    this.$btnPlay.on('click', () => {
      this.play(this.currentPlayer, this.currentSong)
    })

    this.$btnPause.on('click', () => {
      this.pause(this.currentPlayer, this.currentSong)
    })

    this.$btnForward.on('click', () => {
      if (this.currentSong + 1 < this.players[this.currentPlayer]._playlist.tracks.length) {
        this.play(this.currentPlayer, this.currentSong + 1)
      }
    })

    this.$btnBackward.on('click', () => {
      if (this.currentSong - 1 >= 0) {
        this.play(this.currentPlayer, this.currentSong - 1)
      }
    })
  }

  static formatTime (time, milli) {
    if (milli) time = time / 1000
    const hours = Math.floor(time / 3600)
    let mins = '0' + Math.floor((time % 3600) / 60)
    let secs = '0' + Math.floor((time % 60))

    mins = mins.substr(mins.length - 2)
    secs = secs.substr(secs.length - 2)

    if (!isNaN(parseInt(secs))) {
      if (hours) {
        return hours + ':' + mins + ':' + secs
      } else {
        return mins + ':' + secs
      }
    } else {
      return '00:00'
    }
  };

  static swapWith ($this, $that) {
    // create temporary placeholder
    const $temp = $('<div>')

    // 3-step swap
    $this.before($temp)
    $that.before($this)
    $temp.after($that).remove()
  };

  play (playerIndex, songIndex) {
    if (this.currentPlayer !== playerIndex) {
      this.players[this.currentPlayer].pause({
        playlistIndex: this.currentSong
      })
      this.players[playerIndex].play({
        playlistIndex: songIndex
      })
    }

    if (!this.players[playerIndex].playing) {
      this.$btnPlay.fadeToggle(200, 'linear', () => {
        this.$btnPause.fadeToggle(200)
      })
    }
    if (this.players[playerIndex]._playlistIndex !== songIndex) {
      this.players[playerIndex].play({
        playlistIndex: songIndex
      })
    }

    this.currentPlayer = playerIndex
    this.currentSong = songIndex

    this.updatePlayer()
  };

  pause (playerIndex, songIndex) {
    if (this.players[playerIndex].playing) {
      this.$btnPause.fadeToggle(200, 'linear', () => {
        this.$btnPlay.fadeToggle(200)
      })
      this.players[playerIndex].pause({
        playlistIndex: songIndex
      })
    }
  };

  updatePlayer () {
    if (this.$nowPlayingElapsed.text().length === 0) {
      this.$nowPlayingElapsed.text('00:00')
    }
    this.$nowPlayingLength.text(SoundCloudPlayer.formatTime(this.players[this.currentPlayer]._playlist.tracks[this.currentSong].duration, true))
    this.$nowPlayingAlbum.text(this.players[this.currentPlayer]._playlist.title)
    this.$nowPlayingSong.text(this.players[this.currentPlayer]._playlist.tracks[this.currentSong].title)
  }
}