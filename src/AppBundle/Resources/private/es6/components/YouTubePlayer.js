export default class YouTubePlayer {
  get $videoPortraitButtons () {
    return this._$videoPortraitButtons
  }

  set $videoPortraitButtons (value) {
    this._$videoPortraitButtons = value
  }

  get player () {
    return this._player
  }

  set player (value) {
    this._player = value
  }

  get $dismissVideoButton () {
    return this._$dismissVideoButton
  }

  set $dismissVideoButton (value) {
    this._$dismissVideoButton = value
  }

  get $youtubeVideo () {
    return this._$youtubeVideo
  }

  set $youtubeVideo (value) {
    this._$youtubeVideo = value
  }

  get $playVideoButton () {
    return this._$playVideoButton
  }

  set $playVideoButton (value) {
    this._$playVideoButton = value
  }

  onYouTubeIframeAPIReady () {
    this.player = new YT.Player('youtube-video', {
      height: window.height,
      width: window.width,
      videoId: this.$youtubeVideo.data('id'),
      playerVars: {
        controls: 0,
        showinfo: 0
      },
      events: {
        'onReady': () => {
          this.$videoPortraitButtons.fadeIn()
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
    this.$youtubeVideo.fadeOut()
  }

  showAndPlay () {
    this.$youtubeVideo.fadeIn()
    this.player.playVideo()
  }

  constructor ($youtubeVideo) {
    this.$playVideoButton = $('.play-video')
    this.$youtubeVideo = $youtubeVideo
    this.$dismissVideoButton = $('.dismiss-video')
    this.$videoPortraitButtons = $('.video-portrait-buttons')

    window.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady.bind(this)
    this.$playVideoButton.click(this.showAndPlay.bind(this))
    this.$dismissVideoButton.click(this.pauseAndHide.bind(this))
  }

}