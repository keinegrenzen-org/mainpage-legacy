/**
 * Created by Barthy on 27.06.17.
 */

import Animations from './Animations'

export default class SoundCloudPlayer {

  get nowPlayingProgress () {
    return this._$nowPlayingProgress
  }

  set nowPlayingProgress (value) {
    this._$nowPlayingProgress = value
  }

  get nowPlayingSong () {
    return this._$nowPlayingSong
  }

  set nowPlayingSong (value) {
    this._$nowPlayingSong = value
  }

  get nowPlayingAlbum () {
    return this._$nowPlayingAlbum
  }

  set nowPlayingAlbum (value) {
    this._$nowPlayingAlbum = value
  }

  get nowPlayingLength () {
    return this._$nowPlayingLength
  }

  set nowPlayingLength (value) {
    this._$nowPlayingLength = value
  }

  get nowPlayingElapsed () {
    return this._$nowPlayingElapsed
  }

  set nowPlayingElapsed (value) {
    this._$nowPlayingElapsed = value
  }

  get btnBackward () {
    return this._$btnBackward
  }

  set btnBackward (value) {
    this._$btnBackward = value
  }

  get btnForward () {
    return this._$btnForward
  }

  set btnForward (value) {
    this._$btnForward = value
  }

  get btnPause () {
    return this._$btnPause
  }

  set btnPause (value) {
    this._$btnPause = value
  }

  get btnPlay () {
    return this._$btnPlay
  }

  set btnPlay (value) {
    this._$btnPlay = value
  }

  constructor (container) {
    this.players = []

    this.btnPlay = container.querySelector('.player-control.play')
    this.btnPause = container.querySelector('.player-control.pause')
    this.btnForward = container.querySelector('.player-control.forward')
    this.btnBackward = container.querySelector('.player-control.backward')
    this.nowPlayingElapsed = container.querySelector('.now-playing-elapsed')
    this.nowPlayingLength = container.querySelector('.now-playing-length')
    this.nowPlayingAlbum = container.querySelector('.now-playing-album')
    this.nowPlayingSong = container.querySelector('.now-playing-song')
    this.nowPlayingProgress = container.querySelector('.progress-bar')

    this.currentPlayer = 0
    this.currentSong = 0

    const embeds = document.querySelectorAll('.album-embed')
    embeds.forEach((embedElement, embedIndex) => {
      const player = new SoundCloudAudio('3f0c2df99a948f8142621535b3b4ba73')
      this.players.push(player)

      const secondaryColor = embedElement.dataset.colorSecondary

      player.resolve(
        embedElement.dataset.sc,
        playlist => {
          const tracks = playlist.tracks
          const list = embedElement.querySelector('.list-group')

          for (let i = 0; i < tracks.length; i++) {
            const listItem =
              '<li class="list-group-item">' +
              '<span style="color: ' + secondaryColor + '" class="track-number">' + ((i < 9) ? '0' + (i + 1) : (i + 1)) + '</span>' +
              '<span class="title">' + tracks[i].title + '</span>' +
              '<span style="color: ' + secondaryColor + '" class="track-duration">' + SoundCloudPlayer.formatTime(tracks[i].duration, true) + '</span>' +
              '</li>'

            list.insertAdjacentHTML('beforeend', listItem)
            list.querySelector('.list-group-item').addEventListener('click', () => {
              this.play(embedIndex, i)
            }, false)
          }

          // render timer on every second
          player.on('timeupdate', () => {
            this.nowPlayingElapsed.innerText = SoundCloudPlayer.formatTime(new Date(player.audio.currentTime), false)
            const percent = 100 * Math.floor(player.audio.currentTime) / Math.floor(player.audio.duration)
            this.nowPlayingProgress.setAttribute('aria-valuenow', percent)
            this.nowPlayingProgress.style.width = percent + '%'
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

    this.btnPlay.addEventListener('click', () => {
      this.play(this.currentPlayer, this.currentSong)
    }, false)

    this.btnPause.addEventListener('click', () => {
      this.pause(this.currentPlayer, this.currentSong)
    }, false)

    this.btnForward.addEventListener('click', () => {
      if (this.currentSong + 1 < this.players[this.currentPlayer]._playlist.tracks.length) {
        this.play(this.currentPlayer, this.currentSong + 1)
      }
    }, false)

    this.btnBackward.addEventListener('click', () => {
      if (this.currentSong - 1 >= 0) {
        this.play(this.currentPlayer, this.currentSong - 1)
      }
    }, false)
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
      Animations.fadeOut(this.btnPause)
      Animations.fadeIn(this.btnPlay)
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
      Animations.fadeOut(this.btnPlay)
      Animations.fadeIn(this.btnPause)
      this.players[playerIndex].pause({
        playlistIndex: songIndex
      })
    }
  };

  updatePlayer () {
    if (this.nowPlayingElapsed.innerText.length === 0) {
      this.nowPlayingElapsed.innerText = '00:00'
    }
    this.nowPlayingLength.innerText = SoundCloudPlayer.formatTime(
      this.players[this.currentPlayer]._playlist.tracks[this.currentSong].duration,
      true
    )
    this.nowPlayingAlbum.innerText = this.players[this.currentPlayer]._playlist.title
    this.nowPlayingSong.innerText = this.players[this.currentPlayer]._playlist.tracks[this.currentSong].title
  }
}