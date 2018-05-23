import '../scss/app.scss'

document.addEventListener('DOMContentLoaded', function () {

  if(window.LazyLoad){
    new window.LazyLoad();
  }

  const artists = document.querySelector('.artists')
  let isotope
  if (artists) {
    imagesLoaded(artists, () => {
      isotope = new Isotope('.artists-row', {
        itemSelector: '.artist-col',
        masonry: {
          columnWidth: '.grid-sizer',
          percentPosition: true
        }
      })
    })

    const filterButtons = document.querySelectorAll('.genre-filter')
    const filter = (e) => {
      const button = e.currentTarget
      const filter = button.dataset.filter
      const activeButton = document.querySelector('.genre-filter.active')

      activeButton.classList.remove('active')
      isotope.arrange({
        filter: filter
      })
      button.classList.add('active')
    }

    for (let i = 0; i < filterButtons.length; i++) {
      filterButtons[i].addEventListener('click', filter, false)
    }
  }

  window.sr = ScrollReveal({mobile: false, reset: false})
  const preserve = (e) => {
    if (e.classList.contains('sr-preserve')) {
      e.classList.add('sr-done')
      e.removeAttribute('style')
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
