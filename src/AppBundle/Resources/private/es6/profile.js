import SoundCloudPlayer from './components/SoundCloudPlayer'

$(document).ready(() => {

  // Initialize SoundCloud if found
  const $globalPlayer = $('.global-player')
  if ($globalPlayer.length) {
    new SoundCloudPlayer($globalPlayer)
  }

  const $dialog = $('.download-dialog'), $downloadButton = $dialog.find('.btn-download')
  $dialog.find('.dismiss-dialog').click(e => {
    e.preventDefault()
    $dialog.fadeOut()
  })
  $('.toggle-dl-dialog').click(e => {
    e.preventDefault()
    const downloadUrl = e.currentTarget.dataset.url
    if (downloadUrl) {
      $downloadButton.attr('href', downloadUrl)
      $dialog.fadeIn()
    }
  })

  if ($('body').hasClass('mobile') === false) {
    const $profileHeaderTitle = $('.profile-header .page-title'),
      $profileHeaderContent = $('.profile-header .profile-header-content'),
      $videoContainer = $('.profile-header .video-container'),
      $videoPortraitButtons = $('.video-portrait-buttons'),
      $playVideoButton = $('.play-video'),
      $youtubeVideo = $('.youtube-video'),
      $dismissVideoButton = $('.dismiss-video')

    if ($profileHeaderTitle.length) {
      const toggleProfileHeader = () => {
        $profileHeaderTitle.toggleClass('small')
      }

      setTimeout(() => {
        toggleProfileHeader()
        $profileHeaderContent.find('.image-container, .title-container').on('click', toggleProfileHeader)
        setTimeout(() => {
          if ($videoContainer.length) {
            $videoContainer.fadeIn()
            $videoPortraitButtons.fadeIn()
          }
        }, 1000)
      }, 2200)

      if ($youtubeVideo.length) {
        let loaded = false
        let player = false
        $playVideoButton.click(e => {
          e.preventDefault()
          if (loaded === false || !player) {
            loaded = true

            const tag = document.createElement('script')

            tag.src = 'https://www.youtube.com/iframe_api'
            const firstScriptTag = document.getElementsByTagName('script')[0]
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

            window.onYouTubeIframeAPIReady = function () {
              player = new YT.Player('youtube-video', {
                height: window.height,
                width: window.width,
                videoId: $youtubeVideo.data('id'),
                playerVars: {
                  controls: 0,
                  showinfo: 0
                },
                events: {
                  'onReady': event => {
                    $youtubeVideo.fadeIn()
                    event.target.playVideo()
                  },
                  'onStateChange': event => {
                    if (event.data === YT.PlayerState.ENDED) {
                      $youtubeVideo.fadeOut()
                    }
                  }
                }
              })
            }
            $dismissVideoButton.click(e => {
              e.preventDefault()
              player.pauseVideo()
              $youtubeVideo.fadeOut()
            })
          } else {
            $youtubeVideo.fadeIn()
            player.playVideo()
          }
        })
      }
    }
  }
})
