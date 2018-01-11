import '../scss/style.scss'
import GenreFilter from './components/GenreFilter'

$(document).ready(() => {

  const $artistPreviews = $('.artist-col')
  if ($artistPreviews.length) {
    new GenreFilter($artistPreviews)
  }

  $('a[href^="#"]').on('click', e => {
    e.preventDefault()

    let url = new URL($(e.currentTarget).attr('href'))
    if (url.search.length === 0) {
      const selector = (url.hash.length === 0) ? 'header' : url.hash

      $('html, body').animate(
        {
          scrollTop: $(selector).offset().top - 50
        },
        300,
        () => {
          window.location.hash = url.hash
        }
      )
    } else {
      window.location.hash = url.hash
    }
  })

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
