import SoundCloudPlayer from '../Components/SoundCloudPlayer'

$(document).ready(() => {

  $('a[href^=\'#\']').on('click', e => {
    e.preventDefault()

    let hash = $(e.currentTarget).attr('href')
    if (hash === '#') {
      hash = 'header'
    }

    $('html, body').animate(
      {
        scrollTop: $(hash).offset().top - 50
      },
      300,
      () => {
        window.location.hash = hash
      }
    )
  })

  // Initialize SoundCloud if found
  const $globalPlayer = $('.global-player')
  if ($globalPlayer.length) {
    new SoundCloudPlayer($globalPlayer)
  }

  window.sr = ScrollReveal({mobile: false, reset: false})
  const preserve = (e) => {
    const $e = $(e)
    if ($e.hasClass('sr-preserve')) {
      $e.addClass('sr-done')
      $e.removeAttr('style')
    }
  }

  sr.reveal('.sr-t-1', {
    duration: 1000,
    delay: 200,
    origin: 'top',
    afterReveal: preserve
  })
  sr.reveal('.sr-t-2', {
    duration: 1000,
    delay: 400,
    origin: 'top',
    afterReveal: preserve
  })
  sr.reveal('.sr-t-3', {
    duration: 1000,
    delay: 600,
    origin: 'top',
    afterReveal: preserve
  })
  sr.reveal('.sr-b-1', {
    duration: 1000,
    delay: 200,
    origin: 'bottom',
    afterReveal: preserve
  })
  sr.reveal('.sr-b-2', {
    duration: 1000,
    delay: 400,
    origin: 'bottom',
    afterReveal: preserve
  })
  sr.reveal('.sr-b-3', {
    duration: 1000,
    delay: 600,
    origin: 'bottom',
    afterReveal: preserve
  })
})
