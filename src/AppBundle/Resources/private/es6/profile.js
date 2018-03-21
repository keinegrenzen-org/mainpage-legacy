import SoundCloudPlayer from './components/SoundCloudPlayer'
import YouTubePlayer from './components/YouTubePlayer'
import Animations from './components/Animations'

document.addEventListener('DOMContentLoaded', function () {

  // Initialize SoundCloud if found
  const globalPlayer = document.querySelector('.global-player')
  if (globalPlayer) {
    new SoundCloudPlayer(globalPlayer)
  }

  const dialog = document.querySelector('.download-dialog')
  const downloadButton = dialog.querySelector('.btn-download')
  const dialogToggles = document.querySelectorAll('.toggle-dl-dialog')
  const dialogDismissButton = dialog.querySelector('.dismiss-dialog')

  dialogDismissButton.addEventListener('click', e => {
    e.preventDefault()
    Animations.fadeOut(dialog)
  }, false)

  const toggleDialog = e => {
    e.preventDefault()
    const downloadUrl = e.currentTarget.dataset.url
    if (downloadUrl) {
      downloadButton.setAttribute('href', downloadUrl)
      Animations.fadeIn(dialog)
    }
  }

  for (let i = 0; i < dialogToggles.length; i++) {
    dialogToggles[i].addEventListener('click', toggleDialog, false)
  }

  const body = document.getElementsByTagName('body')[0];
  if (!body.classList ||  body.classList.contains('mobile') === false) {
    const profileHeaderTitle = document.querySelector('.profile-header .page-title')
    const profileHeaderContent = document.querySelector('.profile-header .profile-header-content')
    const videoContainer = document.querySelector('.profile-header .video-container')
    const youtubeVideo = document.querySelector('.youtube-video')

    setTimeout(() => {
      profileHeaderTitle.classList.add('small')
      const imageContainer = profileHeaderContent.querySelector('.image-container')
      const titleContainer = profileHeaderContent.querySelector('.title-container')
      const toggleHeader = () => {
        profileHeaderTitle.classList.toggle('small')
      }

      imageContainer.addEventListener('click', toggleHeader, false)
      titleContainer.addEventListener('click', toggleHeader, false)

      setTimeout(() => {
        if (videoContainer) {
          Animations.fadeIn(videoContainer)
        }
      }, 1000)
    }, 2200)

    if (youtubeVideo) {
      new YouTubePlayer(youtubeVideo)
    }
  }
})
