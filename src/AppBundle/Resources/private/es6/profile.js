import SoundCloudPlayer from './components/SoundCloudPlayer'
import YouTubePlayer from './components/YouTubePlayer'

$(document).ready(() => {

  // Initialize SoundCloud if found
  const $globalPlayer = $('.global-player')
  if ($globalPlayer.length) {
    new SoundCloudPlayer($globalPlayer)
  }

  const $dialog = $('.download-dialog')
  const $downloadButton = $dialog.find('.btn-download')
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
    const $profileHeaderTitle = $('.profile-header .page-title')
    const $profileHeaderContent = $('.profile-header .profile-header-content')
    const $videoContainer = $('.profile-header .video-container')
    const $youtubeVideo = $('.youtube-video')

    setTimeout(() => {
      $profileHeaderTitle.addClass('small')
      $profileHeaderContent.find('.image-container, .title-container').on('click', () => {
        $profileHeaderTitle.toggleClass('small')
      })
      setTimeout(() => {
        if ($videoContainer.length) {
          $videoContainer.fadeIn()
        }
      }, 1000)
    }, 2200)

    if ($youtubeVideo.length) {
      new YouTubePlayer($youtubeVideo)
    }
  }
})
