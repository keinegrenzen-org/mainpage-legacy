import Animations from './Animations'

export default class YouTubePlayer {

  get videoPortraitButtons () {
    return this._videoPortraitButtons
  }

  set videoPortraitButtons (value) {
    this._videoPortraitButtons = value
  }

  get player () {
    return this._player
  }

  set player (value) {
    this._player = value
  }

  get dismissVideoButton () {
    return this._dismissVideoButton
  }

  set dismissVideoButton (value) {
    this._dismissVideoButton = value
  }

  get youtubeVideo () {
    return this._youtubeVideo
  }

  set youtubeVideo (value) {
    this._youtubeVideo = value
  }

  get playVideoButton () {
    return this._playVideoButton
  }

  set playVideoButton (value) {
    this._playVideoButton = value
  }

  onYouTubeIframeAPIReady () {
    console.info(this.youtubeVideo.id);
    this.player = new YT.Player('youtube-video', {
      height: window.height,
      width: window.width,
      videoId: this.youtubeVideo.id,
      playerVars: {
        controls: 0,
        showinfo: 0
      },
      events: {
        'onReady': () => {
          Animations.fadeIn(this.videoPortraitButtons)
        },
        'onStateChange': event => {
          if (event.data === YT.PlayerState.ENDED) {
            this.pauseAndHide()
          }
        }
      }
    })
  }

  pauseAndHide () {
    this.player.pauseVideo()
    Animations.fadeOut(this.youtubeVideo)
  }

  showAndPlay () {
    Animations.fadeIn(this.youtubeVideo, 'block', () => {
      this.player.playVideo()
    })
  }

  constructor (youtubeVideo) {
    this.playVideoButton = document.querySelector('.play-video')
    this.youtubeVideo = youtubeVideo
    this.dismissVideoButton = document.querySelector('.dismiss-video')
    this.videoPortraitButtons = document.querySelector('.video-portrait-buttons')

    if (window.YT && window.YT.Player) {
      this.onYouTubeIframeAPIReady()
    } else {
      window.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady.bind(this)
    }

    this.playVideoButton.addEventListener('click', this.showAndPlay.bind(this), false)
    this.dismissVideoButton.addEventListener('click', this.pauseAndHide.bind(this), false)
  }

}