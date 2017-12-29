export default class GenreFilter {

  get $genreLinks () {
    return this._$genreLinks
  }

  set $genreLinks (value) {
    this._$genreLinks = value
  }

  get $artistPreviews () {
    return this._$artistPrevies
  }

  set $artistPreviews (value) {
    this._$artistPrevies = value
  }

  filterProfiles (e) {
    e.preventDefault()
    console.info('click genre thing')

    const genre = e.currentTarget.dataset.genre
    this.$genreLinks.filter('.active').removeClass('active')
    if (genre.length) {
      const genreSelector = '[data-genre!=' + genre + ']'

      const $profilesToHide = this.$artistPreviews.filter(genreSelector)
      if ($profilesToHide.length) {
        $profilesToHide.fadeOut().addClass('hidden')
      }

      const $profilesToUnhide = this.$artistPreviews.filter('.hidden').not(genreSelector)
      if ($profilesToUnhide.length) {
        setTimeout(() => {
          $profilesToUnhide.removeClass('hidden').fadeIn()
        }, 400)
      }

      this.$genreLinks.not(genreSelector).addClass('active')
    } else {
      this.$artistPreviews.filter('.hidden').removeClass('hidden').fadeIn()
      this.$genreLinks.filter('[data-genre=""]').addClass('active')
    }
  }

  constructor ($artistPreviews) {
    this.$artistPreviews = $artistPreviews
    this.$genreLinks = $('.artists .genre-link')
    this.$genreLinks.on('click', this.filterProfiles.bind(this))

    const queryParams = new URLSearchParams(window.location.search)
    if (queryParams.has('genre')) {
      const genre = queryParams.get('genre')
      this.$genreLinks.filter('[data-genre="' + genre + '"]').click()
    }
  }
}