export default class Animations {

  static fadeOut (el, callback) {
    el.style.opacity = 1;

    (function fade () {
      if ((el.style.opacity -= .1) < 0) {
        el.style.display = 'none'
        if (typeof callback === 'function') {
          callback()
        }
      } else {
        requestAnimationFrame(fade)
      }
    })()
  }

  static fadeIn (el, display, callback) {
    el.style.opacity = 0
    el.style.display = display || 'block';

    (function fade () {
      let val = parseFloat(el.style.opacity)
      if (!((val += .1) > 1)) {
        el.style.opacity = val
        requestAnimationFrame(fade)
      } else if (typeof callback === 'function') {
        callback()
      }
    })()
  }
}